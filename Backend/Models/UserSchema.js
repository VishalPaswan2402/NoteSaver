import mongoose from "mongoose";
import saveNote from "./NoteSchema.js";
const Schema = mongoose.Schema;
const NoteUserSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    allNotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: saveNote
    }]
})

const noteUser = mongoose.model("noteUser", NoteUserSchema);
export default noteUser;