import {Router, RequestHandler}  from 'express';
import authenticate from '../middlewares/auth';
import {
    createUser
} from '../controllers/user.controller';

const auth:RequestHandler = authenticate;
const router: Router = Router();

//router.post('/login', auth, register);
router.post('/register', auth, createUser);

export default router;