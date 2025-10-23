import express from 'express'
import isAuthenticated from '../middlewares/authenticated.js';
import shareOriginal from '../Controllers/originalController/shareOriginal.js';
import originalShareCode from '../Controllers/originalController/originalShareCode.js';
import noteShareFalse from '../Controllers/originalController/noteShareFalse.js';
import verifyOriginalShareCode from '../Controllers/originalController/verifyOriginalShareCode.js';
import updateOriginal from '../Controllers/originalController/updateOriginal.js';
const router = express.Router({ mergeParams: true });

// share original 
router.post('/:noteId', isAuthenticated, shareOriginal);

// set share original code
router.post('/:noteId', isAuthenticated, originalShareCode);

// change share original to edit
router.post(':/noteId', isAuthenticated, noteShareFalse);

// compare original share code
router.post('/:noteId', isAuthenticated, verifyOriginalShareCode);

// update original 
router.post('/:noteId', isAuthenticated, updateOriginal);

export default router;