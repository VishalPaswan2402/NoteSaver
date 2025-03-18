import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import saveNote from './Models/NoteSchema.js';
const app = express();
dotenv.config();
app.use(express.json());

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

app.get("/", (req, res) => {
    res.send("Home");
})


// add new note
app.post("/v1/new_note", async (req, res) => {
    console.log("Adding new note...");
    let { title, description } = req.body;
    console.log("title", title);
    console.log("desc", description);
    const newNote = new saveNote({ title, description });
    const saved = await newNote.save();
    console.log(saved);
})


// show all notes
app.get("/v1/all_notes", async (req, res) => {
    console.log("All notes...");
    const notes = await saveNote.find({});
    if (notes) {
        return res.status(200).json(notes);
    } else {
        return res.status(200).json({ message: "Oops! You haven’t added any notes yet." })
    }
})


// view note
app.get("/v1/view_note/:id", async (req, res) => {
    console.log("view note");
    let { id } = req.params;
    console.log(id);
    const views = await saveNote.findById(id);
    if (views) {
        console.log(views);
        return res.status(200).json(views);
    }
    return res.send("Not found");
})



app.listen(port, () => {
    console.log("Running on port", port);
})