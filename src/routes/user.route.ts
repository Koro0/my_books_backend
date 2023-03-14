import {Router}  from 'express';
import {
    register,
    
} from '../controllers/user.controller';

const auth = require('../middlewares/auth');
const router = Router();

//router.post('/login', auth, register);
router.post('/register', auth, register);

export default router;