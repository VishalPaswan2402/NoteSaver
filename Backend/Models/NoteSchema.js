import mongoose from "mongoose";
const Schema = mongoose.Schema;

const saveNoteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: () => new Date().toDateString(),
        required: true
    }
})

const saveNote = mongoose.model("saveNote", saveNoteSchema);
export default saveNote;