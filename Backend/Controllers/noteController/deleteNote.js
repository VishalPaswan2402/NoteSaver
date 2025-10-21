import saveNote from "../../Models/NoteSchema.js";
import noteUser from "../../Models/UserSchema.js";

const deleteNote=async (req, res) => {
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
}

export default deleteNote;