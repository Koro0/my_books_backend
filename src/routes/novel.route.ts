import {Router, RequestHandler}  from 'express';
import authenticate from '../middlewares/authAdmin';

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
    createParagraph,
    getAllParagraphs,
} from '../controllers/novel/chapter.controller';

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
 *CRUD for paragraphs under Chapter
 */
router.post('/:novelId/:chapterId/', auth, createParagraph);
router.get('/:novelId/:chapterId/content', getAllParagraphs);


export default router;