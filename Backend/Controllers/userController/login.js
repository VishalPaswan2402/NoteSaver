import noteUser from "../../Models/UserSchema.js";
import jwt from 'jsonwebtoken';
import session from "express-session";

const login=async (req, res) => {
    const { ...data } = req.body;
    if (data.username == "" || data.password == "") {
        return res.status(400).json({
            message: "Hold on! We need both username and password to log you in.",
            success: false
        });
    } else {
        try {
            const logUser = await noteUser.findOne({
                username: data.username,
                password: data.password
            });
            if (logUser) {
                const token = jwt.sign({
                    email: logUser.email,
                    username: logUser.username,
                    id: logUser._id
                }, process.env.JWT_SECRET_KEY, { expiresIn: "24h" });
                return res.status(200).json({
                    message: "You're in! Welcome back.",
                    logUser,
                    token,
                    navigateUrl: `v1/all-notes/${logUser._id}`,
                    success: true
                });
            } else {
                return res.status(401).json({
                    message: "Oops! That email or password didn’t match our records.",
                    success: false
                })
            }
        }
        catch (error) {
            return res.status(500).json({
                message: "Oops! Something went wrong with your login.",
                success: false
            });
        }
    }
}

export default login;