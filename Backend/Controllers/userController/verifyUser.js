import noteUser from "../../Models/UserSchema.js";
import jwt from 'jsonwebtoken';

const verifyUser=async (req, res) => {
    const { otp } = req.body;
    console.log(otp);
    if (!otp) {
        return res.status(400).json({ message: "Please enter OTP to verify.", success: false });
    }
    try {
        if (!req.session || !req.session.newSignupData) {
            return res.status(400).json({
                message: "Session expired. Please request a new OTP for verification.",
                navigateUrl: "/",
                success: false,
            });
        }
        const { fullname, username, email, password, sendCount, expireTime, otpGen } = req.session.newSignupData;
        if (Date.now() > expireTime) {
            delete req.session.newSignupData;
            return res.status(400).json({
                message: "OTP expired. Please request a new OTP for verification.",
                navigateUrl: "/",
                success: false,
            });
        }
        if (Number(otp) != otpGen) {
            return res.status(400).json({
                message: "Incorrect OTP. Please try again.",
                success: false,
            });
        }
        const newUser = new noteUser({
            fullname,
            username,
            email,
            password
        });
        const savedUser = await newUser.save();
        delete req.session.newSignupData;
        const token = jwt.sign({
            email: savedUser.email,
            username: savedUser.username,
            id: savedUser._id
        }, process.env.JWT_SECRET_KEY, { expiresIn: "24h" });
        return res.status(200).json({
            message: "You're all set! Your account has been created.",
            token,
            logUser: savedUser,
            navigateUrl: `/v1/all-notes/${savedUser._id}`,
            success: true
        });
    }
    catch (error) {
        console.log("verify new user error ", error);
        return res.status(500).json({
            message: "Oops! Something went wrong on our end.",
            success: false
        });
    }
}

export default verifyUser;