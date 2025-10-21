import noteUser from "../../Models/UserSchema.js";

const updatePassword=async (req, res) => {
    const { id } = req.params;
    const { password, cnfPassword } = req.body;
    if (!password || !cnfPassword) {
        return res.status(400).json({
            message: "Hold on! We need both input password to update it.",
            success: false
        });
    }
    try {
        if (!req.session || !req.session.storeSessionData) {
            return res.status(400).json({
                message: "Session expired. Please try again later.",
                navigateUrl: "/",
                success: false,
            });
        }
        const { otpGen, userId, expireTime } = req.session.storeSessionData;
        if (Date.now() > expireTime) {
            delete req.session.storeSessionData;
            return res.status(400).json({
                message: "Session expired. Please try again later.",
                navigateUrl: "/",
                success: false,
            });
        }
        const findUser = await noteUser.findById(userId);
        if (!findUser) {
            delete req.session.storeSessionData;
            return res.status(404).json({
                message: "Looks like that user doesn’t exist in our system.",
                success: false
            });
        }
        if (password != cnfPassword) {
            return res.status(404).json({
                message: "Looks like both password doesn't match. Try again.",
                success: false
            });
        }
        const updatePassword = await noteUser.findByIdAndUpdate(userId, {
            password: password
        });
        delete req.session.storeSessionData;
        res.status(200).json({
            message: "Password updated successfully. You can login with new password.",
            navigateUrl: '/',
            success: true
        });
    }
    catch (error) {
        console.log("Update password error : ", error);
        return res.status(500).json({
            message: "Hmm… something broke during the updation. Try again later.",
            success: false
        });
    }
}

export default updatePassword;