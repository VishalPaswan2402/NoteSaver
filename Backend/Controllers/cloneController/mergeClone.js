import saveNote from "../../Models/NoteSchema.js";

const mergeClone=async (req, res) => {
    const { id, deleteOption } = req.params;
    try {
        const cloneData = await saveNote.findById(id);
        if (!cloneData || cloneData.isOriginal) {
            return res.status(500).json({
                message: "Hmm... we couldn’t find that note.",
                success: false
            });
        }
        else {
            if (deleteOption == "true") {
                const mergeOriginal = await saveNote.findByIdAndUpdate(cloneData.originalNoteId, {
                    title: cloneData.title,
                    description: cloneData.description,
                });
                const deleteClone = await saveNote.findByIdAndDelete(id);
                return res.status(200).json({
                    message: "Successfully merged with original and cleaned up the duplicate.",
                    navigateUrl: `/v1/all-notes/${cloneData.userId}`,
                    success: true
                });
            }
            else if (deleteOption == "false") {
                const mergeOriginal = await saveNote.findByIdAndUpdate(cloneData.originalNoteId, {
                    title: cloneData.title,
                    description: cloneData.description,
                });
                return res.status(200).json({
                    message: "Successfully merged with original.",
                    navigateUrl: `/v1/all-notes/${cloneData.userId}`,
                    success: true
                });
            }
            else {
                return res.status(500).json({
                    message: "Couldn’t complete the merge. Please retry.",
                    success: false
                });
            }
        }
    }
    catch (error) {
        console.log("Merge clone error", error);
        return res.status(500).json({
            message: "Hmm… something broke during the merge. Try once more.",
            success: false
        });
    }
}

export default mergeClone;