import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken';

import saveNote from './Models/NoteSchema.js';
import noteUser from './Models/UserSchema.js';
const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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

app.get("/", async (req, res) => {
    res.send("Home");
})

const allNotesMiddleware = async (req, res, next) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        console.log("No auth");
        return;
    } try {
        const decodedjwt = jwt.verify(auth, process.env.JWT_SECRET_KEY);
        req.user = decodedjwt;
        console.log("req.user : ", req.user);
        next();
    } catch (error) {
        console.log("middle error", error);
    }
}


// add new note
app.post("/v1/new-note/:id", async (req, res) => {
    console.log("Adding new note...");
    const { id } = req.params;
    console.log(id);
    const { ...data } = req.body;
    console.log(data);
    if (data.title == "" || data.description == "") {
        return res.status(400).json({ message: "Data is missing.", success: false });
    } else {
        try {
            // console.log("title", title);
            // console.log("desc", description);
            const newNote = new saveNote({ userId: id, title: data.title, description: data.description });
            const saved = await newNote.save();
            console.log(saved);
            const creator = await noteUser.findById(id)
            creator.allNotes.push(saved._id);
            await creator.save();
            return res.status(200).json({ message: " New note saved successfully", creator: creator, success: true, navigateUrl: `v1/all-notes/${id}` });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error", success: false });
        }
    }
})


// edit note note
app.post("/v1/edit-note/:id", async (req, res) => {
    console.log("Edit your note...");
    const { id } = req.params;
    console.log(id);
    const { ...data } = req.body;
    console.log(data);
    const noteCreator = await saveNote.findById(id);
    const userId = noteCreator.userId;
    if (!data.title || !data.description) {
        return res.status(400).json({ message: "Title or description cannot be empty.", success: false });
    }
    try {
        const updatedNote = await saveNote.findByIdAndUpdate(id, { title: data.title, description: data.description }, { new: true });
        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found.", success: false });
        }
        console.log("Updated Note:", updatedNote);
        return res.status(200).json({ message: "Note updated successfully", updatedNote, navigateUrl: `v1/all-notes/${userId}`, success: true });
    }
    catch (error) {
        console.error("Edit note error:", error);
        return res.status(500).json({ message: "Internal server error", navigateUrl: `v1/all-notes/${userId}`, success: false });
    }
})


// show all notes
app.get("/v1/all-notes/:id", async (req, res) => {
    console.log("All notes...");
    const { id } = req.params;
    try {
        const notes = await saveNote.find({ userId: id });
        if (notes) {
            // console.log(notes);
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
    console.log("view note");
    let { id } = req.params;
    // console.log(id);
    const views = await saveNote.findById(id);
    if (views) {
        // console.log(views);
        return res.status(200).json({ message: "View your note.", viewNote: views, success: true });
    }
    return res.status(500).json({ message: "Something went wrong", success: false });
})

// login 
app.post("/v1/login", async (req, res) => {
    console.log("login");
    const { ...data } = req.body;
    // console.log(data);
    if (data.username == "" || data.password == "") {
        return res.status(400).json({ message: "Data is missing.", success: false });
    } else {
        try {
            const logUser = await noteUser.findOne({ username: data.username, password: data.password });
            if (logUser) {
                // console.log("logUser", logUser);
                const token = jwt.sign({ email: logUser.email, id: logUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "24h" });
                // console.log("Token : ", token);
                return res.status(200).json({ message: "Login successfully.", logUser, token, navigateUrl: `/v1/all-notes/${logUser._id}`, success: true });
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
    console.log("Signup");
    // const { fullname,username, email, password } = req.body;
    // const { ...data } = req.body;
    // console.log(data);
    // if (data.username == "" || data.fullname == "" || data.email == "" || data.password == "" || data.cnfpassword == "") {
    //     return res.status(400).json({ message: "Data is missing." });
    // }
    // else if (data.password != data.cnfpassword) {
    //     return res.status(400).json({ message: "Password not match." });
    // }
    // else {
    // try {
    // const existUser = await noteUser.findOne({ username: data.username });
    // if (existUser) {
    //     return res.status(409).json({ message: "This username is already taken." });
    // } else {
    //     const existEmail = await noteUser.findOne({ email: data.email });
    //     if (existEmail) {
    //         return res.status(409).json({ message: "This email is already registered." });
    //     }
    // }
    //     const newUser = new noteUser({ fullname, username, email, password });
    //     const savedUser = await newUser.save();
    //     console.log(savedUser);
    //     console.log("id : ", savedUser._id)
    //     return res.status(201).json({ message: "User created successfully", user: savedUser,});
    // }
    // catch (error) {
    //     console.log("Signup error : ", error);
    //     return res.status(500).json({ message: "Internal server error." });
    // }
    // }
})

// recover password
app.post("/v1/recover-password", async (req, res) => {
    console.log("recover router");
})

app.listen(port, () => {
    console.log("Running on port", port);
})