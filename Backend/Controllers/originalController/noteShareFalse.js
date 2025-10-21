import saveNote from "../../Models/NoteSchema.js";

const noteShareFalse=async (req, res) => {
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
}

export default noteShareFalse;