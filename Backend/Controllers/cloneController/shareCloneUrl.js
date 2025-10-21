import saveNote from "../../Models/NoteSchema.js";

const shareCloneUrl=async (req, res) => {
    const { originalNoteId } = req.params;
    try {
        const getNote = await saveNote.findById(originalNoteId);
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
        const cloneNote = await saveNote.findOne({
            originalNoteId: originalNoteId
        });
        if (cloneNote) {
            return res.status(200).json({
                message: "Clone already exist..",
                cloneUrl: `/v1/write-clone-file/${originalNoteId}/${cloneNote._id}`,
                success: true
            });
        }
        else {
            return res.status(404).json({
                message: "Sorry, the clone isn’t available right now.",
                success: false
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

export default shareCloneUrl;