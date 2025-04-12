import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken';
import methodOverride from 'method-override';
import passport from './middlewares/passport.js';

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

mongoose.connect(db_url)
    .then(() => console.log("Connected to noteSaver DB"))
    .catch(error => console.log("DB connection fail", error))

// Middleware to protect routes with JWT
const isAuthenticated = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            console.log("Invalid or missing token")
            return res.status(401).json({ message: "Unauthorized user, please login." });
        }
        req.user = user;
        next();
    })(req, res, next);
};

app.get("/", async (req, res) => {
    res.send("Home");
})


// add new note
app.post("/v1/new-note/:id", isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const { ...data } = req.body;
    if (data.title == "" || data.description == "") {
        return res.status(400).json({ message: "Data is missing.", success: false });
    } else {
        try {
            const newNote = new saveNote({ userId: id, title: data.title, description: data.description });
            const saved = await newNote.save();
            const creator = await noteUser.findById(id)
            creator.allNotes.push(saved._id);
            await creator.save();
            return res.status(200).json({ message: " New note saved successfully", creator: creator, success: true, navigateUrl: `/v1/all-notes/${id}` });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error", success: false });
        }
    }
})


// edit note
app.post("/v1/edit-note/:id", isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const { ...data } = req.body;
    const noteCreator = await saveNote.findById(id);
    const userId = noteCreator.userId;
    if (userId != req.user._id.toString()) {
        return res.status(401).json({ message: "You're not permitted to make changes to this note.", success: false });
    }
    if (!data.title || !data.description) {
        return res.status(400).json({ message: "Title or description cannot be empty.", success: false });
    }
    try {
        const updatedNote = await saveNote.findByIdAndUpdate(id, { title: data.title, description: data.description }, { new: true });
        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found.", success: false });
        }
        return res.status(200).json({ message: "Note updated successfully", updatedNote, navigateUrl: `/v1/all-notes/${userId}`, success: true });
    }
    catch (error) {
        console.error("Edit note error:", error);
        return res.status(500).json({ message: "Internal server error", navigateUrl: `v1/all-notes/${userId}`, success: false });
    }
})


// show all notes
app.get("/v1/all-notes/:id", isAuthenticated, async (req, res) => {
    const { id } = req.params;
    try {
        const notes = await saveNote.find({ userId: id });
        if (notes) {
            return res.status(200).json({ message: "All notes", notes: notes, success: true });
        } else {
            return res.status(200).json({ message: "Oops! You haven’t added any notes yet.", success: false })
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error.", success: false });
    }
})


// view note
app.get("/v1/view-note/:id", async (req, res) => {
    let { id } = req.params;
    const views = await saveNote.findById(id);
    if (views) {
        return res.status(200).json({ message: "View your note.", viewNote: views, success: true });
    }
    return res.status(500).json({ message: "Something went wrong", success: false });
})


// delete note
app.delete('/v1/delete-note/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const noteCreator = await saveNote.findById(id);
    const userId = noteCreator.userId;
    if (userId != req.user._id.toString()) {
        return res.status(401).json({ message: "You're not permitted to delete this note.", success: false });
    }
    try {
        const deleteNote = await saveNote.findByIdAndDelete(id);
        const removeReference = await noteUser.findByIdAndUpdate(deleteNote.userId, { $pull: { allNotes: id } });
        return res.status(200).json({ message: "Deleted successfully", navigateUrl: `/v1/all-notes/${deleteNote.userId}`, success: true });
    }
    catch (error) {
        console.log("delete error :", error);
        return res.status(500).json({ message: "Something went wrong", navigateUrl: `/v1/all-notes/${deleteNote.userId}`, success: false });
    }
})


// mark as important
app.post('/v1/mark-important/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const noteData = await saveNote.findById(id);
    const userId = noteData.userId;
    if (userId != req.user._id.toString()) {
        return res.status(401).json({ message: "You're not permitted to make changes to this note.", success: false });
    }
    try {
        const markImp = await saveNote.findByIdAndUpdate(id, { isImportant: !noteData.isImportant }, { new: true });
        const isImp = markImp.isImportant;
        res.status(200).json({ message: `Marked as ${isImp ? 'favourite' : 'default'}.`, navigateUrl: `/v1/all-notes/${noteData.userId}`, success: true });
    }
    catch (error) {
        console.log("delete error :", error);
        return res.status(500).json({ message: "Something went wrong", navigateUrl: `/v1/all-notes/${noteData.userId}`, success: false });
    }
})


// mark archive...
app.post("/v1/mark-archive/:id", isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const prevArchive = await saveNote.findById(id);
    const userId = prevArchive.userId;
    if (userId != req.user._id.toString()) {
        return res.status(401).json({ message: "You're not permitted to make changes to this note.", success: false });
    }
    try {
        if (prevArchive.isArchive) {
            const updateArchive = await saveNote.findByIdAndUpdate(id, { isArchive: false, archiveDate: null }, { new: true });
            const creator = await noteUser.findById(prevArchive.userId)
            creator.allNotes.push(id);
            await creator.save();
        } else {
            const updateArchive = await saveNote.findByIdAndUpdate(id, { isArchive: true, archiveDate: new Date() }, { new: true });
            const removeReference = await noteUser.findByIdAndUpdate(prevArchive.userId, { $pull: { allNotes: id } });
        }
        const isArc = prevArchive.isArchive;
        res.status(200).json({ message: `${!isArc ? 'Successfully moved to archive.' : 'Successfully restored from archive.'}`, navigateUrl: `/v1/all-notes/${prevArchive.userId}`, success: true });
    }
    catch (error) {
        console.log("delete error :", error);
        return res.status(500).json({ message: "Something went wrong", navigateUrl: `/v1/all-notes/${prevArchive.userId}`, success: false });
    }
})


// share original note to edit...
app.post("/v1/share-original/:noteId", isAuthenticated, async (req, res) => {
    const { noteId } = req.params;
    const findNote = await saveNote.findById(noteId);
    const userId = findNote.userId;
    if (userId != req.user._id.toString()) {
        return res.status(401).json({ message: "You're not permitted for this operation.", success: false });
    }
    try {
        if (findNote) {
            if (findNote.isEditable === true) {
                const secretKey = findNote.shareCode;
                return res.status(200).json({ message: `Already editable note.`, shareOriginalUrl: `/v1/write-original-file/${noteId}`, isActiveNote: true, success: true });
            }
            else {
                return res.status(200).json({ message: `Enter secret code.`, isActiveNote: false, navigateUrl: `/v1/enter-share-code/${noteId}`, success: true });
            }
        }
        else {
            return res.status(404).json({ message: "Note not found.", success: false });
        }
    }
    catch (error) {
        console.log("Share original error", error);
        return res.status(500).json({ message: "Something went wrong", success: false });
    }
});


// set share code for note...
app.post('/v1/set-original-share-code/:noteId', isAuthenticated, async (req, res) => {
    const { noteId } = req.params;
    const { ...data } = req.body;
    const getNote = await saveNote.findById(noteId);
    const userId = getNote.userId;
    if (userId != req.user._id.toString()) {
        return res.status(401).json({ message: "You're not permitted for this operation.", success: false });
    }
    try {
        if (getNote) {
            if (getNote.isEditable === false) {
                const updateShareNote = await saveNote.findByIdAndUpdate(noteId, { isEditable: true, shareCode: data.secretKey });
                return res.status(200).json({ message: `Share link generated.`, message: 'Code saved successfully, go to share option to share note.', isPassSet: true, success: true });
            } else {
                return res.status(200).json({ message: `Already active for edit.`, success: true });
            }
        }
        else {
            return res.status(404).json({ message: "Note not found.", success: false });
        }
    }
    catch (error) {
        console.log("Share original error", error);
        return res.status(500).json({ message: "Something went wrong", success: false });
    }
})


// compare share code...
app.post('/v1/verify-original-share-code/:noteId', isAuthenticated, async (req, res) => {
    const { noteId } = req.params;
    const { ...data } = req.body;
    try {
        if (data.secretKey) {
            const findNote = await saveNote.findById(noteId);
            const isAvalEdit = findNote.isEditable;
            if (isAvalEdit) {
                if (findNote.shareCode === data.secretKey) {
                    return res.status(200).json({ message: 'Code verified successfully.', editNote: findNote, isPassSet: false, success: true });
                }
                else {
                    return res.status(401).json({ message: "Please enter correct key.", success: false });
                }
            }
            else {
                return res.status(404).json({ message: "This note is not available for editing.", success: false });
            }
        }
        else {
            return res.status(401).json({ message: "Please enter secret key.", success: false });
        }

    } catch (error) {
        console.log("Secret code error", error);
        return res.status(500).json({ message: "Something went wrong", success: false });
    }
})


// updade original shared data...
app.post('/v1/update-original-shared/:noteId', isAuthenticated, async (req, res) => {
    const { noteId } = req.params;
    const { ...data } = req.body;
    if (!req.user) {
        return res.status(401).json({ message: "You're not permitted for this operation.", success: false });
    }
    try {
        const findNote = await saveNote.findById(noteId);
        if (findNote) {
            const updateNote = await saveNote.findByIdAndUpdate(noteId, { title: data.title, description: data.description });
            res.status(200).json({ message: "Note updated successfully.", success: true, navigateUrl: '/' });
        }
        else {
            return res.status(404).json({ message: "Note is not available to editable.", success: false });
        }
    }
    catch (error) {
        console.log("Edit update error", error);
        return res.status(500).json({ message: "Oops! Couldn't update the note. Please try again.", success: false });
    }
})


// login 
app.post("/v1/login", async (req, res) => {
    const { ...data } = req.body;
    if (data.username == "" || data.password == "") {
        return res.status(400).json({ message: "Data is missing.", success: false });
    } else {
        try {
            const logUser = await noteUser.findOne({ username: data.username, password: data.password });
            if (logUser) {
                const token = jwt.sign({ email: logUser.email, id: logUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "24h" });
                return res.status(200).json({ message: "Login successfully.", logUser, token, navigateUrl: `v1/all-notes/${logUser._id}`, success: true });
            } else {
                return res.status(401).json({ message: "Invalid credentials. Please try again.", success: false })
            }
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error.", success: false });
        }
    }
})


// signup
app.post("/v1/signup", async (req, res) => {
    const { fullname, username, email, password } = req.body;
    const { ...data } = req.body;
    if (data.username == "" || data.fullname == "" || data.email == "" || data.password == "" || data.cnfpassword == "") {
        return res.status(400).json({ message: "Data is missing.", success: false });
    }
    else if (data.password != data.cnfpassword) {
        return res.status(400).json({ message: "Password not match.", success: false });
    }
    else {
        try {
            const existUser = await noteUser.findOne({ username: data.username });
            if (existUser) {
                return res.status(400).json({ message: "This username is already taken.", success: false });
            } else {
                const existEmail = await noteUser.findOne({ email: data.email });
                if (existEmail) {
                    return res.status(400).json({ message: "This email is already registered.", success: false });
                }
            }
            const newUser = new noteUser({ fullname, username, email, password });
            const savedUser = await newUser.save();
            return res.status(200).json({ message: "Account created successfully", logUser: savedUser, navigateUrl: `v1/all-notes/${savedUser._id}`, success: true });
        }
        catch (error) {
            console.log("Signup error : ", error);
            return res.status(500).json({ message: "Internal server error.", success: false });
        }
    }
})


// recover password
app.post("/v1/recover-password", async (req, res) => {
    console.log("recover router");
})


app.listen(port, () => {
    console.log("Running on port", port);
})