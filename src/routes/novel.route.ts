import {Router}  from 'express';

import {
    createNovel,
    getAllNovel,
    getOneNovel,
    updateNovel,
    deleteNovel,
} from '../controllers/novel.controller';

import {
    createChapter,
    getAllChapters,
    getOneChapter,
} from '../controllers/novel/chapter.controller'

const multer = require('../middlewares/multer-config');
const router = Router();


/**
 * Route for CRUD Novel
 */
router.post('/', multer, createNovel);
router.get('/', getAllNovel);
router.get('/:novelId', getOneNovel);
router.put('/:novelId', multer, updateNovel);
router.delete('/:novelId', deleteNovel);

/**
 * Route for CRUD Novel => Chapter
 */
router.post('/:novelId/chapter/', createChapter);
router.get('/:novelId/chapter/', getAllChapters);
router.get('/:novelId/chapter/:chapterId', getOneChapter);

export default router;