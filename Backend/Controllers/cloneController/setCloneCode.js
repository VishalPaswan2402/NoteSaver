import saveNote from "../../Models/NoteSchema.js";

const setCloneCode=async (req, res) => {
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
        const newClone = new saveNote({
            userId: getNote.userId,
            title: getNote.title,
            description: getNote.description,
            isImportant: getNote.isImportant,
            isArchive: getNote.isArchive,
            archiveDate: getNote.archiveDate,
            isEditable: true,
            shareCode: data.secretKey,
            originalNoteId: noteId,
            isOriginal: false
        });
        await newClone.save();
        return res.status(200).json({
            message: 'All done! Your clone is ready. Share it using the share option.',
            navigateUrl: `/v1/all-notes/${userId}`,
            clone: newClone,
            isPassSet: true,
            success: true
        });
    }
    catch (error) {
        console.log("Share original error", error);
        return res.status(500).json({
            message: "Oops! Something went wrong while sharing the clone.",
            success: false
        });
    }
}

export default setCloneCode;