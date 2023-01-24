import {Router}  from 'express';

import {
    createNovel,
    hello,
} from '../controllers/novel.controller';

const multer = require('../middlewares/multer-config');
const router = Router();



router.post('/',  createNovel);
router.get('/', hello);

export default router;