import {Router, RequestHandler}  from 'express';
import authenticate from '../middlewares/auth';
import {
    createUser,
    login,
} from '../controllers/user.controller';

const auth:RequestHandler = authenticate;
const router: Router = Router();

router.post('/login', login);
router.post('/register', createUser);

export default router;