import {Router}  from 'express';
import {
    register,
} from '../controllers/user.controller';

const multer = require('../middlewares/multer-config');
const router = Router();

router.post('/login', multer, register);
router.post('/register', multer, register);

export default router;