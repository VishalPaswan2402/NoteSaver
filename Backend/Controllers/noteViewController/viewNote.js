import saveNote from "../../Models/NoteSchema.js";

const viewNote=async (req, res) => {
    let { id } = req.params;
    try {
        const views = await saveNote.findById(id);
        if (views) {
            return res.status(200).json({
                message: "Note found successfully.",
                viewNote: views,
                success: true
            });
        }
        return res.status(500).json({
            message: "Hmm... we couldn’t find that note.",
            success: false
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Oops! server failed, try again later.",
            success: false
        });
    }
}

export default viewNote;