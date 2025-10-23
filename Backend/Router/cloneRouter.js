import express from 'express'
import isAuthenticated from '../middlewares/authenticated.js';
import createClone from '../Controllers/cloneController/createClone.js';
import setCloneCode from '../Controllers/cloneController/setCloneCode.js';
import shareCloneUrl from '../Controllers/cloneController/shareCloneUrl.js';
import verifyCloneCode from '../Controllers/cloneController/verifyCloneCode.js';
import updateClone from '../Controllers/cloneController/updateCLone.js';
import mergeClone from '../Controllers/cloneController/mergeClone.js';
const router = express.Router({ mergeParams: true });

// create clone
router.post('/:noteId', isAuthenticated, createClone);

// set share clone code
router.post('/:noteId', isAuthenticated, setCloneCode);

// fetch clone url to share
router.get('/:originalNodeId', isAuthenticated, shareCloneUrl);

// compare clone share code
router.post('/:cloneId', isAuthenticated, verifyCloneCode);

// update clone shared data
router.post('/:cloneId', isAuthenticated, updateClone);

// merger clone with original 
router.post('/:id/:deleteOption?', mergeClone);

export default router;