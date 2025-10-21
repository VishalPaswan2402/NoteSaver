import saveNote from "../../Models/NoteSchema.js";

const originalShareCode=async (req, res) => {
    const { noteId } = req.params;
    const { ...data } = req.body;
    if (!data.secretKey) {
        return res.status(400).json({
            message: "Please enter secret key.",
            success: false
        })
    }
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
        if (getNote.isEditable === false) {
            const updateShareNote = await saveNote.findByIdAndUpdate(noteId, {
                isEditable: true,
                shareCode: data.secretKey
            });
            return res.status(200).json({
                message: 'Saved! Want to share it? Use the share option.',
                isPassSet: true,
                success: true
            });
        } else {
            return res.status(200).json({
                message: `Already available for share.`,
                success: true
            });
        }
    }
    catch (error) {
        console.log("Share original error", error);
        return res.status(500).json({
            message: "Oops! Something went wrong while sharing the note.",
            success: false
        });
    }
}

export default originalShareCode;