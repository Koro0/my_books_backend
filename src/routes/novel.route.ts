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
    getChapter,
} from '../controllers/novel/chapter.controller'

const multer = require('../middlewares/multer-config');
const router = Router();


/**
 * Route for CRUD Novel
 */
router.post('/', multer, createNovel);
router.get('/', getAllNovel);
router.get('/:id', getOneNovel);
router.put('/:id', multer, updateNovel);
router.delete('/:id', deleteNovel);

/**
 * Route dor CRUD Novel => Chapter
 */
router.post('/chapter/:id', createChapter);
router.get('/chapter/:id', getChapter);

export default router;