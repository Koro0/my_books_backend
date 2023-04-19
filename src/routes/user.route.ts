import {Router}  from 'express';

import {
    createUser,
    login,
} from '../controllers/user.controller';

const router: Router = Router();

router.post('/login', login);
router.post('/register', createUser);

export default router;