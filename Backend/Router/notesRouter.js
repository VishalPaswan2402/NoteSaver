import express from 'express';
import isAuthenticated from '../middlewares/authenticated.js';
import addNewNote from '../Controllers/noteController/addNewNote.js';
import editNote from '../Controllers/noteController/editNote.js';
import getAllNotes from '../Controllers/noteViewController/getAllNotes.js';
import viewNote from '../Controllers/noteViewController/viewNote.js';
import deleteNote from '../Controllers/noteController/deleteNote.js';
import session from "express-session";
const router = express.Router({ mergeParams: true });

// new notes
router.post('/:id', isAuthenticated, addNewNote);

// edit notes
router.post('/:id', isAuthenticated, editNote);

// show all notes
router.get('/:id', isAuthenticated, getAllNotes);

// view note
router.get('/:id', viewNote);

// delete note
router.delete('/:id', isAuthenticated, deleteNote);

export default router;