import saveNote from "../../Models/NoteSchema.js";

const updateOriginal=async (req, res) => {
    const { noteId } = req.params;
    const { ...data } = req.body;
    try {
        const findNote = await saveNote.findById(noteId);
        if (findNote) {
            if (findNote.isEditable) {
                const updateNote = await saveNote.findByIdAndUpdate(noteId, {
                    title: data.title,
                    description: data.description
                });
                res.status(200).json({
                    message: "Great! The original note is now updated.",
                    success: true,
                    navigateUrl: '/'
                });
            }
            else {
                return res.status(404).json({
                    message: "Sorry, editing isn’t allowed for this note.",
                    success: false
                });
            }
        }
        else {
            return res.status(500).json({
                message: "Hmm... we couldn’t find that note.",
                success: false
            });
        }
    }
    catch (error) {
        console.log("Edit update error", error);
        return res.status(500).json({
            message: "Something went wrong with the note updation. Try again!",
            success: false
        });
    }
}

export default updateOriginal;