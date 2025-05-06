import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken';
import methodOverride from 'method-override';
import passport from './middlewares/passport.js';
import isAuthenticated from './middlewares/authenticated.js';
import { mailSender } from './middlewares/mailSender.js';
import session from "express-session";
import MongoStore from 'connect-mongo';

import saveNote from './Models/NoteSchema.js';
import noteUser from './Models/UserSchema.js';
const app = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

const port = process.env.PORT || 8080;
const db_url = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/notesaver";

const corsOption = {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}

app.use(cors(corsOption));

const store = MongoStore.create({
    mongoUrl: db_url,
    crypto: {
        secret: process.env.secretPass || 'noteDrive'
    },
    touchAfter: 24 * 3600,
});

store.on("error", () => {
    console.log("Error in mongoos session...", err);
})

const sessionOption = {
    store,
    secret:
        // process.env.secretPass || 
        'noteDrive',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.use(session(sessionOption));

mongooseFunction()
    .then(() => {
        console.log("Connected to noteSaver DB")
    })
    .catch((err) => {
        console.log(err);
    });
async function mongooseFunction() {
    await mongoose.connect(db_url);
};


// home router
app.get("/", async (req, res) => {
    res.send("NoteDrive");
})


// add new note
app.post("/v1/new-note/:id", isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const { ...data } = req.body;
    if (data.title == "" || data.description == "") {
        return res.status(400).json({
            message: "Oops! Don’t forget to add a title and a description.",
            success: false
        });
    } else {
        try {
            const newNote = new saveNote({
                userId: id,
                title: data.title,
                description: data.description
            });
            const saved = await newNote.save();
            const creator = await noteUser.findById(id)
            creator.allNotes.push(saved._id);
            await creator.save();
            return res.status(200).json({
                message: "Note saved successfully.",
                creator: creator,
                success: true,
                navigateUrl: `/v1/all-notes/${id}`
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Something went wrong while saving.",
                success: false
            });
        }
    }
})


// edit note
app.post("/v1/edit-note/:id", isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const { ...data } = req.body;
    if (!data.title || !data.description) {
        return res.status(400).json({
            message: "Oops! Don’t forget to add a title and a description.",
            success: false
        });
    }
    try {
        const noteCreator = await saveNote.findById(id);
        if (!noteCreator) {
            return res.status(500).json({
                message: "Hmm... we couldn’t find that note.",
                success: false
            });
        }
        const userId = noteCreator.userId;
        if (userId != req.user._id.toString()) {
            return res.status(401).json({
                message: "You're not permitted to make changes to this note.",
                success: false
            });
        }
        const updatedNote = await saveNote.findByIdAndUpdate(id, {
            title: data.title,
            description: data.description
        }, { new: true });
        if (!updatedNote) {
            return res.status(404).json({
                message: "Hmm... we couldn’t find that note.",
                success: false
            });
        }
        return res.status(200).json({
            message: "All set! Your note’s been updated.",
            updatedNote,
            navigateUrl: `/v1/all-notes/${userId}`,
            success: true
        });
    }
    catch (error) {
        console.error("Edit note error:", error);
        return res.status(500).json({
            message: "Uh-oh! Couldn't update the note. Try again?",
            navigateUrl: `/`,
            success: false
        });
    }
})


// show all notes
app.get("/v1/all-notes/:id", isAuthenticated, async (req, res) => {
    const { id } = req.params;
    try {
        const findUser = await noteUser.findById(id);
        if (!findUser) {
            return res.status(500).json({
                message: "Uh-oh! user is not exist.",
                success: false
            });
        }
        const notes = await saveNote.find({ userId: id });
        if (notes) {
            return res.status(200).json({
                message: "All notes",
                notes: notes,
                success: true
            });
        } else {
            return res.status(200).json({
                message: "Oops! You haven’t added any notes yet.",
                success: false
            })
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Oops! server failed, try again later.",
            success: false
        });
    }
})


// view note
app.get("/v1/view-note/:id", async (req, res) => {
    let { id } = req.params;
    try {
        const views = await saveNote.findById(id);
        if (views) {
            return res.status(200).json({
                message: "Note found successfully.",
                viewNote: views,
                success: true
            });
        }
        return res.status(500).json({
            message: "Hmm... we couldn’t find that note.",
            success: false
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Oops! server failed, try again later.",
            success: false
        });
    }
})


// delete note
app.delete('/v1/delete-note/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    try {
        const findNote = await saveNote.findById(id);
        if (!findNote) {
            return res.status(500).json({
                message: "Hmm... we couldn’t find that note.",
                success: false
            });
        }
        const userId = findNote.userId;
        if (userId != req.user._id.toString()) {
            return res.status(401).json({
                message: "You're not permitted to delete this note.",
                success: false
            });
        }
        if (findNote.isOriginal) {
            const cloneDelete = await saveNote.findOneAndDelete({
                originalNoteId: id,
                userId: findNote.userId,
                isOriginal: false
            });
            const deleteNote = await saveNote.findByIdAndDelete(id);
            const removeReference = await noteUser.findByIdAndUpdate(deleteNote.userId, {
                $pull: { allNotes: id }
            });
            return res.status(200).json({
                message: "Done! Your note has been deleted.",
                navigateUrl: `/v1/all-notes/${deleteNote.userId}`,
                success: true
            });
        }
        else {
            const delteteClone = await saveNote.findByIdAndDelete(id);
            return res.status(200).json({
                message: "Done! Your note has been deleted.",
                navigateUrl: `/v1/all-notes/${delteteClone.userId}`,
                success: true
            });
        }
    }
    catch (error) {
        console.log("delete error :", error);
        return res.status(500).json({
            message: "Failed to delete the note.",
            navigateUrl: `/`,
            success: false
        });
    }
})


// mark as important
app.post('/v1/mark-important/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    try {
        const findNote = await saveNote.findById(id);
        if (!findNote) {
            return res.status(500).json({
                message: "Hmm... we couldn’t find that note.",
                success: false
            });
        }
        const userId = findNote.userId;
        if (userId != req.user._id.toString()) {
            return res.status(401).json({
                message: "You're not permitted to make changes to this note.",
                success: false
            });
        }
        // const findNote = await saveNote.findById(id);
        if (findNote.isArchive) {
            return res.status(500).json({
                message: "Uh-oh! Please restore your note.",
                success: false
            });
        }
        const markImp = await saveNote.findByIdAndUpdate(id, {
            isImportant: !findNote.isImportant
        }, { new: true });
        const isImp = markImp.isImportant;
        res.status(200).json({
            message: `Got it! This note is now marked as ${isImp ? 'favourite' : 'default'}.`,
            navigateUrl: `/v1/all-notes/${findNote.userId}`,
            success: true
        });
    }
    catch (error) {
        console.log("delete error :", error);
        return res.status(500).json({
            message: "Uh-oh! Couldn't update the note’s status. Try again ?",
            navigateUrl: `/`,
            success: false
        });
    }
})


// mark archive...
app.post("/v1/mark-archive/:id", isAuthenticated, async (req, res) => {
    const { id } = req.params;
    try {
        const prevArchive = await saveNote.findById(id);
        if (!prevArchive) {
            return res.status(500).json({
                message: "Hmm... we couldn’t find that note.",
                success: false
            });
        }
        const userId = prevArchive.userId;
        if (userId != req.user._id.toString()) {
            return res.status(401).json({
                message: "You're not permitted to make changes to this note.",
                success: false
            });
        }
        if (!prevArchive.isOriginal) {
            return res.status(500).json({
                message: "Sorry! Clone data can't move to archive.",
                success: false
            });
        }
        if (prevArchive.isArchive) {
            const updateArchive = await saveNote.findByIdAndUpdate(id, {
                isArchive: false,
                archiveDate: null
            }, { new: true });
            const creator = await noteUser.findById(prevArchive.userId)
            creator.allNotes.push(id);
            await creator.save();
        } else {
            const updateArchive = await saveNote.findByIdAndUpdate(id, {
                isArchive: true,
                archiveDate: new Date()
            }, { new: true });
            const removeReference = await noteUser.findByIdAndUpdate(prevArchive.userId, {
                $pull: { allNotes: id }
            });
        }
        const isArc = prevArchive.isArchive;
        res.status(200).json({
            message: `${!isArc ? 'Done! Your note’s now archived' : 'Done! Your note’s restored from archive'}`,
            navigateUrl: `/v1/all-notes/${prevArchive.userId}`,
            success: true
        });
    }
    catch (error) {
        console.log("delete error :", error);
        return res.status(500).json({
            message: "Oops! That didn’t work",
            navigateUrl: `/`,
            success: false
        });
    }
})


// share original note to edit...
app.post("/v1/share-original/:noteId", isAuthenticated, async (req, res) => {
    const { noteId } = req.params;
    try {
        const findNote = await saveNote.findById(noteId);
        if (!findNote) {
            return res.status(500).json({
                message: "Hmm... we couldn’t find that note.",
                success: false
            });
        }
        const userId = findNote.userId;
        if (userId != req.user._id.toString()) {
            return res.status(401).json({
                message: "You're not permitted for this operation.",
                success: false
            });
        }
        if (findNote.isEditable === true) {
            const secretKey = findNote.shareCode;
            return res.status(200).json({
                message: `Already available to share your note.`,
                shareOriginalUrl: `/v1/write-original-file/${noteId}`,
                isActiveNote: true,
                success: true
            });
        }
        else {
            return res.status(200).json({
                message: `Enter secret code.`,
                isActiveNote: false,
                navigateUrl: `/v1/enter-share-code/${noteId}`,
                success: true
            });
        }
    }
    catch (error) {
        console.log("Share original error", error);
        return res.status(500).json({
            message: "Oops! That didn’t work",
            success: false
        });
    }
});


// set share original code for note...
app.post('/v1/set-original-share-code/:noteId', isAuthenticated, async (req, res) => {
    const { noteId } = req.params;
    const { ...data } = req.body;
    if (!data.secretKey) {
        return res.status(400).json({
            message: "Please enter secret key.",
            success: false
        })
    }
    try {
        const getNote = await saveNote.findById(noteId);
        if (!getNote) {
            return res.status(500).json({
                message: "Hmm... we couldn’t find that note.",
                success: false
            });
        }
        const userId = getNote.userId;
        if (userId != req.user._id.toString()) {
            return res.status(401).json({
                message: "You're not permitted for this operation.",
                success: false
            });
        }
        if (getNote.isEditable === false) {
            const updateShareNote = await saveNote.findByIdAndUpdate(noteId, {
                isEditable: true,
                shareCode: data.secretKey
            });
            return res.status(200).json({
                message: 'Saved! Want to share it? Use the share option.',
                isPassSet: true,
                success: true
            });
        } else {
            return res.status(200).json({
                message: `Already available for share.`,
                success: true
            });
        }
    }
    catch (error) {
        console.log("Share original error", error);
        return res.status(500).json({
            message: "Oops! Something went wrong while sharing the note.",
            success: false
        });
    }
})


// change share original to edit...
app.post('/v1/set-note-share-false/:noteId', isAuthenticated, async (req, res) => {
    const { noteId } = req.params;
    try {
        const getNote = await saveNote.findById(noteId);
        if (!getNote) {
            return res.status(500).json({
                message: "Hmm... we couldn’t find that note.",
                success: false
            });
        }
        const userId = getNote.userId;
        if (userId != req.user._id.toString()) {
            return res.status(401).json({
                message: "You're not permitted for this operation.",
                success: false
            });
        }
        const updateNote = await saveNote.findByIdAndUpdate(noteId, {
            shareCode: null,
            isEditable: false
        });
        return res.status(200).json({
            message: `This note can’t be edited by shared people — it’s now view-only.`,
            success: true
        });
    }
    catch (error) {
        console.log("Edit chage error.", error);
        return res.status(500).json({
            message: "Oops! Something went wrong while updating the note.",
            success: false
        });
    }
})


// compare original share code...
app.post('/v1/verify-original-share-code/:noteId', isAuthenticated, async (req, res) => {
    const { noteId } = req.params;
    const { ...data } = req.body;
    try {
        if (data.secretKey) {
            const findNote = await saveNote.findById(noteId);
            if (!findNote) {
                return res.status(500).json({
                    message: "Hmm... we couldn’t find that note.",
                    success: false
                });
            }
            const isAvalEdit = findNote.isEditable;
            if (isAvalEdit) {
                if (findNote.shareCode === data.secretKey) {
                    return res.status(200).json({
                        message: 'Code verified successfully.',
                        editNote: findNote,
                        isPassSet: false,
                        success: true
                    });
                }
                else {
                    return res.status(401).json({
                        message: "Please enter correct key.",
                        success: false
                    });
                }
            }
            else {
                return res.status(404).json({
                    message: "Sorry, editing isn’t allowed for this note.",
                    success: false
                });
            }
        }
        else {
            return res.status(401).json({
                message: "Please enter secret key.",
                success: false
            });
        }
    } catch (error) {
        console.log("Secret code error", error);
        return res.status(500).json({
            message: "Something went wrong with the code verification. Try again!",
            success: false
        });
    }
})


// updade original shared data...
app.post('/v1/update-original-shared/:noteId', isAuthenticated, async (req, res) => {
    const { noteId } = req.params;
    const { ...data } = req.body;
    try {
        const findNote = await saveNote.findById(noteId);
        if (findNote) {
            const updateNote = await saveNote.findByIdAndUpdate(noteId, {
                title: data.title,
                description: data.description
            });
            res.status(200).json({
                message: "Great! The original note is now updated.",
                success: true,
                navigateUrl: '/'
            });
        }
        else {
            return res.status(404).json({
                message: "Sorry, editing isn’t allowed for this note.",
                success: false
            });
        }
    }
    catch (error) {
        console.log("Edit update error", error);
        return res.status(500).json({
            message: "Something went wrong with the note updation. Try again!",
            success: false
        });
    }
})

// create clone to share...
app.post("/v1/share-clone/:noteId", isAuthenticated, async (req, res) => {
    const { noteId } = req.params;
    try {
        const findNote = await saveNote.findById(noteId);
        if (!findNote) {
            return res.status(500).json({
                message: "Hmm... we couldn’t find that note.",
                success: false
            });
        }
        const userId = findNote.userId;
        if (userId != req.user._id.toString()) {
            return res.status(401).json({
                message: "You're not permitted for this operation.",
                success: false
            });
        }
        const cloneNote = await saveNote.findOne({
            originalNoteId: noteId
        });
        if (cloneNote) {
            const secretKey = findNote.shareCode;
            return res.status(200).json({
                message: `Clone already exist.`,
                shareCloneUrl: `/v1/write-clone-file/${noteId}/${cloneNote._id}`,
                isActiveNote: true,
                success: true
            });
        }
        else {
            return res.status(200).json({
                message: `Enter secret code.`,
                isActiveNote: false,
                navigateUrl: `/v1/enter-share-code/${noteId}`,
                success: true
            });
        }
    }
    catch (error) {
        console.log("Share original error", error);
        return res.status(500).json({
            message: "Oops! Something went wrong while sharing the clone.",
            success: false
        });
    }
});


// set share clone code for note...
app.post('/v1/set-clone-share-code/:noteId', isAuthenticated, async (req, res) => {
    const { noteId } = req.params;
    const { ...data } = req.body;
    if (!data.secretKey) {
        return res.status(400).json({
            message: "Please enter secret key.",
            success: false
        })
    }
    try {
        const getNote = await saveNote.findById(noteId);
        if (!getNote) {
            return res.status(500).json({
                message: "Hmm... we couldn’t find that note.",
                success: false
            });
        }
        const userId = getNote.userId;
        if (userId != req.user._id.toString()) {
            return res.status(401).json({
                message: "You're not permitted for this operation.",
                success: false
            });
        }
        const newClone = new saveNote({
            userId: getNote.userId,
            title: getNote.title,
            description: getNote.description,
            isImportant: getNote.isImportant,
            isArchive: getNote.isArchive,
            archiveDate: getNote.archiveDate,
            isEditable: true,
            shareCode: data.secretKey,
            originalNoteId: noteId,
            isOriginal: false
        });
        await newClone.save();
        return res.status(200).json({
            message: 'All done! Your clone is ready. Share it using the share option.',
            navigateUrl: `/v1/all-notes/${userId}`,
            clone: newClone,
            isPassSet: true,
            success: true
        });
    }
    catch (error) {
        console.log("Share original error", error);
        return res.status(500).json({
            message: "Oops! Something went wrong while sharing the clone.",
            success: false
        });
    }
})


// fetch clone url to share...
app.get('/v1/share-clone-url/:originalNoteId', isAuthenticated, async (req, res) => {
    const { originalNoteId } = req.params;
    try {
        const getNote = await saveNote.findById(originalNoteId);
        if (!getNote) {
            return res.status(500).json({
                message: "Hmm... we couldn’t find that note.",
                success: false
            });
        }
        const userId = getNote.userId;
        if (userId != req.user._id.toString()) {
            return res.status(401).json({
                message: "You're not permitted for this operation.",
                success: false
            });
        }
        const cloneNote = await saveNote.findOne({
            originalNoteId: originalNoteId
        });
        if (cloneNote) {
            return res.status(200).json({
                message: "Clone already exist..",
                cloneUrl: `/v1/write-clone-file/${originalNoteId}/${cloneNote._id}`,
                success: true
            });
        }
        else {
            return res.status(404).json({
                message: "Sorry, the clone isn’t available right now.",
                success: false
            });
        }
    }
    catch (error) {
        console.log("Share original error", error);
        return res.status(500).json({
            message: "Oops! Something went wrong while sharing the clone.",
            success: false
        });
    }
})


// compare clone share code...
app.post('/v1/verify-clone-share-code/:cloneId', isAuthenticated, async (req, res) => {
    const { cloneId } = req.params;
    const { ...data } = req.body;
    try {
        if (data.secretKey) {
            const findNote = await saveNote.findById(cloneId);
            if (findNote) {
                const isAvalEdit = findNote.isEditable;
                if (isAvalEdit) {
                    if (findNote.shareCode === data.secretKey) {
                        return res.status(200).json({
                            message: 'Code verified successfully.',
                            editNote: findNote,
                            isPassSet: false,
                            success: true
                        });
                    }
                    else {
                        return res.status(401).json({
                            message: "Please enter correct key.",
                            success: false
                        });
                    }
                }
                else {
                    return res.status(404).json({
                        message: "Sorry, editing isn’t allowed for this note.",
                        success: false
                    });
                }
            }
            else {
                return res.status(404).json({
                    message: "Sorry, the clone isn’t available right now.",
                    success: false
                });
            }
        }
        else {
            return res.status(401).json({
                message: "Please enter secret key.",
                success: false
            });
        }
    } catch (error) {
        console.log("Secret code error", error);
        return res.status(500).json({
            message: "Something went wrong with the code verification. Try again!",
            success: false
        });
    }
})


// updade clone shared data...
app.post('/v1/update-clone-shared/:cloneId', isAuthenticated, async (req, res) => {
    const { cloneId } = req.params;
    const { ...data } = req.body;
    try {
        const findNote = await saveNote.findById(cloneId);
        if (findNote) {
            const updateNote = await saveNote.findByIdAndUpdate(cloneId, {
                title: data.title,
                description: data.description
            });
            res.status(200).json({
                message: "The cloned note is updated! All changes are saved.",
                success: true,
                navigateUrl: '/'
            });
        }
        else {
            return res.status(404).json({
                message: "Sorry, editing isn’t allowed for this note.",
                success: false
            });
        }
    }
    catch (error) {
        console.log("Edit update error", error);
        return res.status(500).json({
            message: "Something went wrong with the clone updation. Try again!",
            success: false
        });
    }
})


// login 
app.post("/v1/login", async (req, res) => {
    const { ...data } = req.body;
    if (data.username == "" || data.password == "") {
        return res.status(400).json({
            message: "Hold on! We need both username and password to log you in.",
            success: false
        });
    } else {
        try {
            const logUser = await noteUser.findOne({
                username: data.username,
                password: data.password
            });
            if (logUser) {
                const token = jwt.sign({
                    email: logUser.email,
                    username: logUser.username,
                    id: logUser._id
                }, process.env.JWT_SECRET_KEY, { expiresIn: "24h" });
                return res.status(200).json({
                    message: "You're in! Welcome back.",
                    logUser,
                    token,
                    navigateUrl: `v1/all-notes/${logUser._id}`,
                    success: true
                });
            } else {
                return res.status(401).json({
                    message: "Oops! That email or password didn’t match our records.",
                    success: false
                })
            }
        }
        catch (error) {
            return res.status(500).json({
                message: "Oops! Something went wrong with your login.",
                success: false
            });
        }
    }
})


// signup
app.post("/v1/signup", async (req, res) => {
    const { fullname, username, email, password } = req.body;
    const { ...data } = req.body;
    if (data.username == "" || data.fullname == "" || data.email == "" || data.password == "" || data.cnfpassword == "") {
        return res.status(400).json({
            message: "Hang tight! Please fill out all the required details to sign up.",
            success: false
        });
    }
    else if (data.password != data.cnfpassword) {
        return res.status(400).json({
            message: "Oops! Your passwords don’t match.",
            success: false
        });
    }
    else {
        try {
            const existUser = await noteUser.findOne({
                username: data.username
            });
            if (existUser) {
                return res.status(400).json({
                    message: "Looks like someone already grabbed that username.",
                    success: false
                });
            } else {
                const existEmail = await noteUser.findOne({
                    email: data.email
                });
                if (existEmail) {
                    return res.status(400).json({
                        message: "Email already taken—try another or log in.",
                        success: false
                    });
                }
            }
            const newUser = new noteUser({
                fullname,
                username,
                email,
                password
            });
            const savedUser = await newUser.save();
            const token = jwt.sign({
                email: savedUser.email,
                username: savedUser.username,
                id: savedUser._id
            }, process.env.JWT_SECRET_KEY, { expiresIn: "24h" });
            return res.status(200).json({
                message: "You're all set! Your account has been created.",
                token,
                logUser: savedUser,
                navigateUrl: `v1/all-notes/${savedUser._id}`,
                success: true
            });
        }
        catch (error) {
            console.log("Signup error : ", error);
            return res.status(500).json({
                message: "Oops! Something went wrong on our end.",
                success: false
            });
        }
    }
})


// fetch user data...
app.get('/v1/userdata/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    try {
        if (id != req.user._id.toString()) {
            return res.status(401).json({
                message: "You're not permitted for this operation.",
                success: false
            });
        }
        const userData = await noteUser.findById(id);
        if (userData) {
            return res.status(200).json({
                message: "User found.",
                userData: userData,
                success: true
            });
        }
        else {
            return res.status(404).json({
                message: "Looks like that user doesn’t exist in our system.",
                success: false
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: "Oops! Something went wrong on our end.",
            success: false
        });
    }
})


// merge clone with original...
app.post('/v1/merge-clone/original/:id/:deleteOption?', async (req, res) => {
    const { id, deleteOption } = req.params;
    try {
        const cloneData = await saveNote.findById(id);
        if (!cloneData || cloneData.isOriginal) {
            return res.status(500).json({
                message: "Hmm... we couldn’t find that note.",
                success: false
            });
        }
        else {
            if (deleteOption == "true") {
                const mergeOriginal = await saveNote.findByIdAndUpdate(cloneData.originalNoteId, {
                    title: cloneData.title,
                    description: cloneData.description,
                });
                const deleteClone = await saveNote.findByIdAndDelete(id);
                return res.status(200).json({
                    message: "Successfully merged with original and cleaned up the duplicate.",
                    navigateUrl: `/v1/all-notes/${cloneData.userId}`,
                    success: true
                });
            }
            else if (deleteOption == "false") {
                const mergeOriginal = await saveNote.findByIdAndUpdate(cloneData.originalNoteId, {
                    title: cloneData.title,
                    description: cloneData.description,
                });
                return res.status(200).json({
                    message: "Successfully merged with original.",
                    navigateUrl: `/v1/all-notes/${cloneData.userId}`,
                    success: true
                });
            }
            else {
                return res.status(500).json({
                    message: "Couldn’t complete the merge. Please retry.",
                    success: false
                });
            }
        }
    }
    catch (error) {
        console.log("Merge clone error", error);
        return res.status(500).json({
            message: "Hmm… something broke during the merge. Try once more.",
            success: false
        });
    }
})


// recover password
app.post("/v1/recover-password", async (req, res) => {
    const { ...data } = req.body;
    if (!data.username || !data.email) {
        return res.status(400).json({
            message: "Hold on! We need both username and email to recover your password.",
            success: false
        });
    }
    try {
        const findUser = await noteUser.findOne({
            username: data.username,
            email: data.email
        });
        if (findUser) {
            const otpGen = Math.floor(100000 + Math.random() * 900000);
            console.log(otpGen);
            const userId = findUser._id;
            const userEmail = findUser.email;
            const sendCount = 1;
            const expireTime = Date.now() + 5 * 60 * 1000;  // OTP expires in 5 minutes
            req.session.storeSessionData = { otpGen, userEmail, userId, sendCount, expireTime };
            await mailSender(
                findUser.email,
                "NoteDrive OTP Verification",
                '',
                `<h1>Your OTP is <b>${otpGen}</b></h1>`
            );
            res.status(200).json({
                message: "User found.",
                recoverUser: findUser,
                navigateUrl: `/v1/verify-email/${findUser._id}`,
                success: true
            });
        }
        else {
            return res.status(401).json({
                message: "Oops! That email or username didn’t match our records.",
                success: false
            })
        }
    }
    catch (error) {
        return res.status(500).json({
            message: "Hmm… something broke during the recovery. Try once more.",
            success: false
        });
    }
})


// verify otp
app.post('/v1/verify-otp', async (req, res) => {
    const { otp } = req.body;
    console.log(otp);
    if (!otp) {
        return res.status(400).json({
            message: "Hold on! We need OTP to verify your account.",
            success: false
        });
    }
    try {
        if (!req.session || !req.session.storeSessionData) {
            return res.status(400).json({
                message: "Session expired. Please request a new OTP for verification.",
                navigateUrl: "/",
                success: false,
            });
        }
        const { otpGen, userId, expireTime } = req.session.storeSessionData;
        if (Date.now() > expireTime) {
            delete req.session.storeSessionData;
            return res.status(400).json({
                message: "OTP expired. Please request a new OTP for verification.",
                navigateUrl: "/",
                success: false,
            });
        }
        const userData = await noteUser.findById(userId);
        if (!userData) {
            delete req.session.storeSessionData;
            return res.status(404).json({
                message: "Looks like that user doesn’t exist in our system.",
                success: false
            });
        }
        if (Number(otp) != otpGen) {
            return res.status(400).json({
                message: "Incorrect OTP. Please try again.",
                success: false,
            });
        }
        res.status(200).json({
            message: "OTP verified successfully!",
            navigateUrl: `/v1/new-password/${userData._id}`,
            success: true
        });
    }
    catch (error) {
        console.log("Verify error : ", error);
        return res.status(500).json({
            message: "Hmm… something broke during the verification. Try again later.",
            success: false
        });
    }
})


// update password
app.post('/v1/update-password/:id', async (req, res) => {
    const { id } = req.params;
    const { password, cnfPassword } = req.body;
    if (!password || !cnfPassword) {
        return res.status(400).json({
            message: "Hold on! We need both input password to update it.",
            success: false
        });
    }
    try {
        // operation
        if (!req.session || !req.session.storeSessionData) {
            return res.status(400).json({
                message: "Session expired. Please try again later.",
                navigateUrl: "/",
                success: false,
            });
        }
        const { otpGen, userId, expireTime } = req.session.storeSessionData;
        if (Date.now() > expireTime) {
            delete req.session.storeSessionData;
            return res.status(400).json({
                message: "Session expired. Please try again later.",
                navigateUrl: "/",
                success: false,
            });
        }
        const findUser = await noteUser.findById(userId);
        if (!findUser) {
            delete req.session.storeSessionData;
            return res.status(404).json({
                message: "Looks like that user doesn’t exist in our system.",
                success: false
            });
        }
        if (password != cnfPassword) {
            return res.status(404).json({
                message: "Looks like both password doesn't match. Try again.",
                success: false
            });
        }
        const updatePassword = await noteUser.findByIdAndUpdate(userId, {
            password: password
        });
        delete req.session.storeSessionData;
        res.status(200).json({
            message: "Password updated successfully. You can login with new password.",
            navigateUrl: '/',
            success: true
        });
    }
    catch (error) {
        console.log("Update password error : ", error);
        return res.status(500).json({
            message: "Hmm… something broke during the updation. Try again later.",
            success: false
        });
    }
})


// resend otp
app.get("/v1/resend-otp/:id", async (req, res) => {
    console.log("Resending otp...");
    const { id } = req.params;
    try {
        if (!req.session || !req.session.storeSessionData) {
            return res.status(400).json({
                message: "Session expired. Please try again later.",
                navigateUrl: "/",
                success: false,
            });
        }
        const { userEmail, sendCount } = req.session.storeSessionData;
        if (sendCount == 3) {
            delete req.session.storeSessionData;
            return res.status(400).json({
                message: "Resend limit reached. Please check your email or try again shortly.",
                navigateUrl: '/',
                success: false
            })
        }
        let newOtp = Math.floor(100000 + Math.random() * 900000);
        console.log("New otp", newOtp);
        req.session.storeSessionData.otpGen = newOtp;
        req.session.storeSessionData.expireTime = Date.now() + 5 * 60 * 1000;
        req.session.storeSessionData.sendCount = sendCount + 1;
        await mailSender(
            userEmail,
            "NoteDrive OTP Verification",
            '',
            `<h1>Your OTP is <b>${newOtp}</b></h1>`
        );
        return res.status(200).json({
            message: "A new OTP has been sent to your email",
            success: true
        });
    }
    catch (error) {
        console.log("Resend otp error", error);
        return res.status(500).json({
            message: "Hmm… something broke during the updation. Try again later.",
            success: false
        });
    }
})


// start server...
app.listen(port, () => {
    console.log("Running on port", port);
})