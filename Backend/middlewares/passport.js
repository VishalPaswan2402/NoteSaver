import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import noteUser from '../Models/UserSchema.js';
import dotenv from 'dotenv';
dotenv.config();

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY,
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await noteUser.findById(jwt_payload.id);
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch (err) {
        return done(err, false);
    }
}));

export default passport;
