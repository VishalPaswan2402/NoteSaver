import noteUser from "../../Models/UserSchema.js";
import saveNote from "../../Models/NoteSchema.js";

const addNewNote = async (req, res) => {
    const { id } = req.params;
    const { ...data } = req.body;
    if (data.title == "" || data.description == "") {
        return res.status(400).json({
            message: "Oops! Don’t forget to add a title and a description.",
            success: false
        });
    } else {
        try {
            const newNote = new saveNote({
                userId: id,
                title: data.title,
                description: data.description
            });
            const saved = await newNote.save();
            const creator = await noteUser.findById(id)
            creator.allNotes.push(saved._id);
            await creator.save();
            return res.status(200).json({
                message: "Note saved successfully.",
                creator: creator,
                success: true,
                navigateUrl: `/v1/all-notes/${id}`
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Something went wrong while saving.",
                success: false
            });
        }
    }
}

export default addNewNote;