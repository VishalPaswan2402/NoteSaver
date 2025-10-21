import saveNote from "../../Models/NoteSchema.js";

const createClone=async (req, res) => {
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
}

export default createClone;