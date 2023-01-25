import {Router}  from 'express';

import {
    createNovel,
    getAllNovel,
    getOneNovel,
    updateNovel,
    deleteNovel,
} from '../controllers/novel.controller';

const multer = require('../middlewares/multer-config');
const router = Router();


/**
 * Route for CRUD Novel
 */
router.post('/', multer, createNovel);
router.get('/', getAllNovel);
router.get('/:id', getOneNovel);
router.put(':id', multer, updateNovel);
router.delete(':id', deleteNovel);

export default router;