import {Router, RequestHandler}  from 'express';
import authenticate from '../middlewares/auth';

import {
    likesNovel,
    likesRecipe,
} from '../controllers/novel/like.controller';

const router: Router = Router();
const auth:RequestHandler = authenticate;

/**
 * Routye for Like Tab for Liked or Disliked
 */
router.post('/recipe/:id/', auth, likesRecipe);
router.post('/novel/:id/', auth, likesNovel);

export default router;