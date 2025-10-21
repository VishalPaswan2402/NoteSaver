import saveNote from "../../Models/NoteSchema.js";

const verifyOriginalShareCode = async (req, res) => {
    const { noteId } = req.params;
    const { ...data } = req.body;
    try {
        if (data.secretKey) {
            const findNote = await saveNote.findById(noteId);
            if (!findNote) {
                return res.status(500).json({
                    message: "Hmm... we couldn’t find that note.",
                    success: false
                });
            }
            const isAvalEdit = findNote.isEditable;
            if (isAvalEdit) {
                if (findNote.shareCode === data.secretKey) {
                    return res.status(200).json({
                        message: 'Code verified successfully.',
                        editNote: findNote,
                        isPassSet: false,
                        success: true
                    });
                }
                else {
                    return res.status(401).json({
                        message: "Please enter correct key.",
                        success: false
                    });
                }
            }
            else {
                return res.status(404).json({
                    message: "Sorry, editing isn’t allowed for this note.",
                    success: false
                });
            }
        }
        else {
            return res.status(401).json({
                message: "Please enter secret key.",
                success: false
            });
        }
    } catch (error) {
        console.log("Secret code error", error);
        return res.status(500).json({
            message: "Something went wrong with the code verification. Try again!",
            success: false
        });
    }
}

export default verifyOriginalShareCode;