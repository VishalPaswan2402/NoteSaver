import noteUser from "../../Models/UserSchema.js";

const verifyOtp=async (req, res) => {
    const { otp } = req.body;
    console.log(otp);
    if (!otp) {
        return res.status(400).json({
            message: "Hold on! We need OTP to verify your account.",
            success: false
        });
    }
    try {
        if (!req.session || !req.session.storeSessionData) {
            return res.status(400).json({
                message: "Session expired. Please request a new OTP for verification.",
                navigateUrl: "/",
                success: false,
            });
        }
        const { otpGen, userId, expireTime } = req.session.storeSessionData;
        if (Date.now() > expireTime) {
            delete req.session.storeSessionData;
            return res.status(400).json({
                message: "OTP expired. Please request a new OTP for verification.",
                navigateUrl: "/",
                success: false,
            });
        }
        const userData = await noteUser.findById(userId);
        if (!userData) {
            delete req.session.storeSessionData;
            return res.status(404).json({
                message: "Looks like that user doesn’t exist in our system.",
                success: false
            });
        }
        if (Number(otp) != otpGen) {
            return res.status(400).json({
                message: "Incorrect OTP. Please try again.",
                success: false,
            });
        }
        res.status(200).json({
            message: "OTP verified successfully!",
            navigateUrl: `/v1/new-password/${userData._id}`,
            success: true
        });
    }
    catch (error) {
        console.log("Verify error : ", error);
        return res.status(500).json({
            message: "Hmm… something broke during the verification. Try again later.",
            success: false
        });
    }
}

export default verifyOtp;