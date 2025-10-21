import saveNote from "../../Models/NoteSchema.js";

const updateClone=async (req, res) => {
    const { cloneId } = req.params;
    const { ...data } = req.body;
    try {
        const findNote = await saveNote.findById(cloneId);
        if (findNote) {
            const updateNote = await saveNote.findByIdAndUpdate(cloneId, {
                title: data.title,
                description: data.description
            });
            res.status(200).json({
                message: "The cloned note is updated! All changes are saved.",
                success: true,
                navigateUrl: '/'
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
        console.log("Edit update error", error);
        return res.status(500).json({
            message: "Something went wrong with the clone updation. Try again!",
            success: false
        });
    }
}

export default updateClone;