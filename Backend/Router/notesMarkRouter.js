import express from 'express'
import isAuthenticated from '../middlewares/authenticated.js';
import markAsImportant from '../Controllers/noteMarkController/markAsImportant.js';
import markArchive from '../Controllers/noteMarkController/markArchive.js';
const router = express.Router({ mergeParams: true });

// mark important
router.post('/:id', isAuthenticated, markAsImportant);

// mark archieve
router.post('/:id', isAuthenticated, markArchive);

export default router;