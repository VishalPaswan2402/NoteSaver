import { mailSender } from "../../middlewares/mailSender.js";

const resendOtp=async (req, res) => {
    console.log("Resending otp...");
    const { id } = req.params;
    try {
        if (!req.session || !req.session.storeSessionData) {
            return res.status(400).json({
                message: "Session expired. Please try again later.",
                navigateUrl: "/",
                success: false,
            });
        }
        const { userEmail, sendCount } = req.session.storeSessionData;
        if (sendCount == 3) {
            delete req.session.storeSessionData;
            return res.status(400).json({
                message: "Resend limit reached. Please check your email or try again shortly.",
                navigateUrl: '/',
                success: false
            })
        }
        let newOtp = Math.floor(100000 + Math.random() * 900000);
        console.log("New otp", newOtp);
        req.session.storeSessionData.otpGen = newOtp;
        req.session.storeSessionData.expireTime = Date.now() + 5 * 60 * 1000;
        req.session.storeSessionData.sendCount = sendCount + 1;
        await mailSender(
            userEmail,
            "NoteDrive OTP Verification",
            '',
            `<h1>Your OTP is <b>${newOtp}</b></h1>`
        );
        return res.status(200).json({
            message: "A new OTP has been sent to your email",
            success: true
        });
    }
    catch (error) {
        console.log("Resend otp error", error);
        return res.status(500).json({
            message: "Hmm… something broke during the updation. Try again later.",
            success: false
        });
    }
}

export default resendOtp;