import { mailSender } from "../../middlewares/mailSender.js";
import noteUser from "../../Models/UserSchema.js";

const signup=async (req, res) => {
    const { fullname, username, email, password } = req.body;
    const { ...data } = req.body;
    if (data.username == "" || data.fullname == "" || data.email == "" || data.password == "" || data.cnfpassword == "") {
        return res.status(400).json({
            message: "Hang tight! Please fill out all the required details to sign up.",
            success: false
        });
    }
    else if (data.password != data.cnfpassword) {
        return res.status(400).json({
            message: "Oops! Your passwords don’t match.",
            success: false
        });
    }
    else {
        try {
            const existUser = await noteUser.findOne({
                username: data.username
            });
            if (existUser) {
                return res.status(400).json({
                    message: "Looks like someone already grabbed that username.",
                    success: false
                });
            } else {
                const existEmail = await noteUser.findOne({
                    email: data.email
                });
                if (existEmail) {
                    return res.status(400).json({
                        message: "Email already taken—try another or log in.",
                        success: false
                    });
                }
            }
            const sendCount = 1;
            const expireTime = Date.now() + 5 * 60 * 1000;
            const otpGen = Math.floor(100000 + Math.random() * 900000);
            console.log(otpGen);
            req.session.newSignupData = { fullname, username, email, password, sendCount, expireTime, otpGen };
            await mailSender(
                email,
                "NoteDrive OTP Verification",
                '',
                `<h1>Your OTP is <b>${otpGen}</b></h1>`
            );
            return res.status(200).json({
                message: "Just one step away to create account.",
                // token,
                userEmail: email,
                navigateUrl: `/v1/signup-verify/${expireTime}`,
                success: true
            });
        }
        catch (error) {
            console.log("Signup error : ", error);
            return res.status(500).json({
                message: "Oops! Something went wrong on our end.",
                success: false
            });
        }
    }
}

export default signup;