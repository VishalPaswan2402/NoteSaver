import saveNote from "../../Models/NoteSchema.js";

const editNote = async (req, res) => {
    const { id } = req.params;
    const { ...data } = req.body;
    if (!data.title || !data.description) {
        return res.status(400).json({
            message: "Oops! Don’t forget to add a title and a description.",
            success: false
        });
    }
    try {
        const noteCreator = await saveNote.findById(id);
        if (!noteCreator) {
            return res.status(500).json({
                message: "Hmm... we couldn’t find that note.",
                success: false
            });
        }
        const userId = noteCreator.userId;
        if (userId != req.user._id.toString()) {
            return res.status(401).json({
                message: "You're not permitted to make changes to this note.",
                success: false
            });
        }
        const updatedNote = await saveNote.findByIdAndUpdate(id, {
            title: data.title,
            description: data.description
        }, { new: true });
        if (!updatedNote) {
            return res.status(404).json({
                message: "Hmm... we couldn’t find that note.",
                success: false
            });
        }
        return res.status(200).json({
            message: "All set! Your note’s been updated.",
            updatedNote,
            navigateUrl: `/v1/all-notes/${userId}`,
            success: true
        });
    }
    catch (error) {
        console.error("Edit note error:", error);
        return res.status(500).json({
            message: "Uh-oh! Couldn't update the note. Try again?",
            navigateUrl: `/`,
            success: false
        });
    }
}

export default editNote;