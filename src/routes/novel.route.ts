import {Router, RequestHandler}  from 'express';
import authenticate from '../middlewares/auth';

import {
    createNovel,
    getAllNovel,
    getOneNovel,
    updateNovel,
    deleteNovel,
} from '../controllers/novel/novel.controller';

import {
    createChapter,
    getAllChapters,
    getOneChapter,
} from '../controllers/novel/chapter.controller';

import {
    likeNovel,
} from '../controllers/novel/like.controller';

const multer = require('../middlewares/multer-config');
const router: Router = Router();
const auth:RequestHandler = authenticate;

/**
 * Route for CRUD Novel
 */
router.post('/', multer, auth, createNovel);
router.get('/', getAllNovel);
router.get('/:novelId', getOneNovel);
router.put('/:novelId', multer, updateNovel);
router.delete('/:novelId', auth, deleteNovel);

/**
 * Route for CRUD Novel => Chapter
 */
router.post('/:novelId/chapter/', auth, createChapter);
router.get('/:novelId/chapter/', getAllChapters);
router.get('/:novelId/chapter/:chapterId', getOneChapter);

/**
 * Routye for Like Tab for Liked or Disliked
 */
router.post('/:novelId/like', likeNovel);

export default router;