import {Router, RequestHandler}  from 'express';
import authenticate from '../middlewares/auth';

import {
    like,
} from '../controllers/novel/like.controller';

const router: Router = Router();
const auth:RequestHandler = authenticate;

/**
 * Routye for Like Tab for Liked or Disliked
 */
router.post('/:category/:id/', auth, like);

export default router;