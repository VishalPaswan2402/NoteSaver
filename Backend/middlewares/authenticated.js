import passport from "passport";

const isAuthenticated = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            console.log("Invalid or missing token")
            return res.status(401).json({ message: "Oops ! You're not logged in." });
        }
        req.user = user;
        next();
    })(req, res, next);
};

export default isAuthenticated;