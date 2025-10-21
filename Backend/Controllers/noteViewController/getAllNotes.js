import saveNote from "../../Models/NoteSchema.js";
import noteUser from "../../Models/UserSchema.js";

const getAllNotes=async (req, res) => {
    const { id } = req.params;
    try {
        const findUser = await noteUser.findById(id);
        if (!findUser) {
            return res.status(500).json({
                message: "Uh-oh! user is not exist.",
                success: false
            });
        }
        const notes = await saveNote.find({ userId: id });
        if (notes) {
            return res.status(200).json({
                message: "All notes",
                notes: notes,
                success: true
            });
        } else {
            return res.status(200).json({
                message: "Oops! You haven’t added any notes yet.",
                success: false
            })
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Oops! server failed, try again later.",
            success: false
        });
    }
}

export default getAllNotes;