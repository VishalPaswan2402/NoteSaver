import { mailSender } from "../../middlewares/mailSender.js";
import noteUser from "../../Models/UserSchema.js";

const recoverPassword=async (req, res) => {
    const { ...data } = req.body;
    if (!data.username || !data.email) {
        return res.status(400).json({
            message: "Hold on! We need both username and email to recover your password.",
            success: false
        });
    }
    try {
        const findUser = await noteUser.findOne({
            username: data.username,
            email: data.email
        });
        if (findUser) {
            const otpGen = Math.floor(100000 + Math.random() * 900000);
            console.log(otpGen);
            const userId = findUser._id;
            const userEmail = findUser.email;
            const sendCount = 1;
            const expireTime = Date.now() + 5 * 60 * 1000;  // OTP expires in 5 minutes
            req.session.storeSessionData = { otpGen, userEmail, userId, sendCount, expireTime };
            await mailSender(
                findUser.email,
                "NoteDrive OTP Verification",
                '',
                `<h1>Your OTP is <b>${otpGen}</b></h1>`
            );
            res.status(200).json({
                message: "User found.",
                recoverUser: findUser,
                navigateUrl: `/v1/verify-email/${findUser._id}`,
                success: true
            });
        }
        else {
            return res.status(401).json({
                message: "Oops! That email or username didn’t match our records.",
                success: false
            })
        }
    }
    catch (error) {
        return res.status(500).json({
            message: "Hmm… something broke during the recovery. Try once more.",
            success: false
        });
    }
}

export default recoverPassword;