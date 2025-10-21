import noteUser from "../../Models/UserSchema.js";

const userData=async (req, res) => {
    const { id } = req.params;
    try {
        if (id != req.user._id.toString()) {
            return res.status(401).json({
                message: "You're not permitted for this operation.",
                success: false
            });
        }
        const userData = await noteUser.findById(id);
        if (userData) {
            return res.status(200).json({
                message: "User found.",
                userData: userData,
                success: true
            });
        }
        else {
            return res.status(404).json({
                message: "Looks like that user doesn’t exist in our system.",
                success: false
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: "Oops! Something went wrong on our end.",
            success: false
        });
    }
}

export default userData;