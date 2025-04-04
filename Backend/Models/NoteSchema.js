import mongoose from "mongoose";
const Schema = mongoose.Schema;

const saveNoteSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isImportant: {
        type: Boolean,
        default: false
    },
    isArchive: {
        type: Boolean,
        default: false
    },
    archiveDate: {
        type: Date,
        default: null,
        expires: 864000, // 10 days in seconds (10 * 24 * 60 * 60)
    },
    date: {
        type: String,
        default: () => new Date().toISOString(),
        required: true
    }
})

const saveNote = mongoose.model("saveNote", saveNoteSchema);
export default saveNote;