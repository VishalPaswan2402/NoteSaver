import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";
import passport from './middlewares/passport.js';
import isAuthenticated from './middlewares/authenticated.js';
import { mailSender } from './middlewares/mailSender.js';
import session from "express-session";
import MongoStore from 'connect-mongo';
import addNewNote from './Controllers/noteController/addNewNote.js'

import editNote from './Controllers/noteController/editNote.js';
import getAllNotes from './Controllers/noteViewController/getAllNotes.js';
import viewNote from './Controllers/noteViewController/viewNote.js';
import deleteNote from './Controllers/noteController/deleteNote.js';
import markAsImportant from './Controllers/noteMarkController/markAsImportant.js';
import shareOriginal from './Controllers/originalController/shareOriginal.js';
import originalShareCode from './Controllers/originalController/originalShareCode.js';
import noteShareFalse from './Controllers/originalController/noteShareFalse.js';
import verifyOriginalShareCode from './Controllers/originalController/verifyOriginalShareCode.js';
import updateOriginal from './Controllers/originalController/updateOriginal.js';
import createClone from './Controllers/cloneController/createClone.js';
import setCloneCode from './Controllers/cloneController/setCloneCode.js';
import shareCloneUrl from './Controllers/cloneController/shareCloneUrl.js';
import verifyCloneCode from './Controllers/cloneController/verifyCloneCode.js';
import updateClone from './Controllers/cloneController/updateCLone.js';
import login from './Controllers/userController/login.js';
import signup from './Controllers/userController/signup.js';
import verifyUser from './Controllers/userController/verifyUser.js';
import userData from './Controllers/userController/userData.js';
import mergeClone from './Controllers/cloneController/mergeClone.js';
import recoverPassword from './Controllers/passwordController/recoverPassword.js';
import updatePassword from './Controllers/passwordController/updatePassword.js';
import markArchive from './Controllers/noteMarkController/markArchive.js';
import resendOtp from './Controllers/otpController/resendOtp.js';
import verifyOtp from './Controllers/otpController/verifyOtp.js';
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
app.post("/v1/new-note/:id", isAuthenticated, addNewNote)

// edit note
app.post("/v1/edit-note/:id", isAuthenticated, editNote)

// show all notes
app.get("/v1/all-notes/:id", isAuthenticated, getAllNotes)

// view note
app.get("/v1/view-note/:id", viewNote)

// delete note
app.delete('/v1/delete-note/:id', isAuthenticated, deleteNote)

// mark as important
app.post('/v1/mark-important/:id', isAuthenticated, markAsImportant)

// mark archive...
app.post("/v1/mark-archive/:id", isAuthenticated, markArchive)

// share original note to edit...
app.post("/v1/share-original/:noteId", isAuthenticated, shareOriginal);

// set share original code for note...
app.post('/v1/set-original-share-code/:noteId', isAuthenticated, originalShareCode)

// change share original to edit...
app.post('/v1/set-note-share-false/:noteId', isAuthenticated, noteShareFalse)

// compare original share code...
app.post('/v1/verify-original-share-code/:noteId', isAuthenticated, verifyOriginalShareCode)

// updade original shared data...
app.post('/v1/update-original-shared/:noteId', isAuthenticated, updateOriginal)

// create clone to share...
app.post("/v1/share-clone/:noteId", isAuthenticated, createClone);

// set share clone code for note...
app.post('/v1/set-clone-share-code/:noteId', isAuthenticated, setCloneCode)

// fetch clone url to share...
app.get('/v1/share-clone-url/:originalNoteId', isAuthenticated, shareCloneUrl)

// compare clone share code...
app.post('/v1/verify-clone-share-code/:cloneId', isAuthenticated, verifyCloneCode)

// updade clone shared data...
app.post('/v1/update-clone-shared/:cloneId', isAuthenticated, updateClone)

// login 
app.post("/v1/login", login)

// signup
app.post("/v1/signup", signup)

// verify new user otp...
app.post('/v1/verify-newUser/otp', verifyUser)

// fetch user data...
app.get('/v1/userdata/:id', isAuthenticated, userData)

// merge clone with original...
app.post('/v1/merge-clone/original/:id/:deleteOption?', mergeClone)

// recover password
app.post("/v1/recover-password", recoverPassword)

// verify otp
app.post('/v1/verify-otp', verifyOtp)

// update password
app.post('/v1/update-password/:id', updatePassword)

// resend otp
app.get("/v1/resend-otp/:id", resendOtp)

// start server...
app.listen(port, () => {
    console.log("Running on port", port);
})