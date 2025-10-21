import saveNote from "../../Models/NoteSchema.js";

const markAsImportant=async (req, res) => {
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
}

export default markAsImportant;