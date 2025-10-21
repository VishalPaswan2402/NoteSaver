import saveNote from "../../Models/NoteSchema.js";
import noteUser from "../../Models/UserSchema.js";

const markArchive=async (req, res) => {
    const { id } = req.params;
    try {
        const prevArchive = await saveNote.findById(id);
        if (!prevArchive) {
            return res.status(500).json({
                message: "Hmm... we couldn’t find that note.",
                success: false
            });
        }
        const userId = prevArchive.userId;
        if (userId != req.user._id.toString()) {
            return res.status(401).json({
                message: "You're not permitted to make changes to this note.",
                success: false
            });
        }
        if (!prevArchive.isOriginal) {
            return res.status(500).json({
                message: "Sorry! Clone data can't move to archive.",
                success: false
            });
        }
        if (prevArchive.isArchive) {
            const updateArchive = await saveNote.findByIdAndUpdate(id, {
                isArchive: false,
                archiveDate: null
            }, { new: true });
            const creator = await noteUser.findById(prevArchive.userId)
            creator.allNotes.push(id);
            await creator.save();
        } else {
            const updateArchive = await saveNote.findByIdAndUpdate(id, {
                isArchive: true,
                archiveDate: new Date()
            }, { new: true });
            const removeReference = await noteUser.findByIdAndUpdate(prevArchive.userId, {
                $pull: { allNotes: id }
            });
        }
        const isArc = prevArchive.isArchive;
        res.status(200).json({
            message: `${!isArc ? 'Done! Your note’s now archived' : 'Done! Your note’s restored from archive'}`,
            navigateUrl: `/v1/all-notes/${prevArchive.userId}`,
            success: true
        });
    }
    catch (error) {
        console.log("delete error :", error);
        return res.status(500).json({
            message: "Oops! That didn’t work",
            navigateUrl: `/`,
            success: false
        });
    }
}

export default markArchive;