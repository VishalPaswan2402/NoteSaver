import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";
import passport from './middlewares/passport.js';
import session from "express-session";
import MongoStore from 'connect-mongo';
import notesRouter from './Router/notesRouter.js';
import notesMarkRouter from './Router/notesMarkRouter.js';
import cloneRouter from './Router/cloneRouter.js';
import loginSignup from './Router/loginSignup.js';
import shareOriginalRouter from './Router/shareOriginalRouter.js';
const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

const port = process.env.PORT || 8080;
const db_url = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/notesaver";

const corsOption = {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}

app.use(cors(corsOption));

const store = MongoStore.create({
    mongoUrl: db_url,
    crypto: {
        secret: process.env.secretPass || 'noteDrive'
    },
    touchAfter: 24 * 3600,
});

store.on("error", () => {
    console.log("Error in mongoos session...", err);
})

const sessionOption = {
    store,
    secret:
        // process.env.secretPass || 
        'noteDrive',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.use(session(sessionOption));

mongooseFunction()
    .then(() => {
        console.log("Connected to noteSaver DB")
    })
    .catch((err) => {
        console.log(err);
    });
async function mongooseFunction() {
    await mongoose.connect(db_url);
};

// home router
app.get("/", async (req, res) => {
    res.send("NoteDrive");
})

// add new note
app.use("/v1/new-note", notesRouter)

// edit note
app.use("/v1/edit-note", notesRouter)

// show all notes
app.use("/v1/all-notes", notesRouter)

// view note
app.use("/v1/view-note", notesRouter)

// delete note
app.use('/v1/delete-note', notesRouter)

// mark as important
app.use('/v1/mark-important', notesMarkRouter)

// mark archive...
app.use("/v1/mark-archive", notesMarkRouter)

// share original note to edit...
app.use("/v1/share-original", shareOriginalRouter);

// set share original code for note...
app.use('/v1/set-original-share-code', shareOriginalRouter)

// change share original to edit...
app.use('/v1/set-note-share-false', shareOriginalRouter)

// compare original share code...
app.use('/v1/verify-original-share-code', shareOriginalRouter)

// updade original shared data...
app.use('/v1/update-original-shared', shareOriginalRouter)

// create clone to share...
app.use("/v1/share-clone", cloneRouter);

// set share clone code for note...
app.use('/v1/set-clone-share-code', cloneRouter)

// fetch clone url to share...
app.use('/v1/share-clone-url', cloneRouter)

// compare clone share code...
app.use('/v1/verify-clone-share-code', cloneRouter)

// updade clone shared data...
app.use('/v1/update-clone-shared', cloneRouter)

// login 
app.use("/v1", loginSignup)

// signup
app.use("/v1", loginSignup)

// verify new user otp...
app.use('/v1/verify-newUser', loginSignup)

// fetch user data...
app.use('/v1/userdata', loginSignup)

// merge clone with original...
app.use('/v1/merge-clone/original', cloneRouter)

// recover password
app.use("/v1", loginSignup)

// verify otp
app.use('/v1', loginSignup)

// update password
app.use('/v1/update-password', loginSignup)

// resend otp
app.use("/v1/resend-otp", loginSignup)

// start server...
app.listen(port, () => {
    console.log("Running on port", port);
})