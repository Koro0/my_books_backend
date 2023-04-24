import {Router, RequestHandler}  from 'express';
import authenticate from '../middlewares/auth';

import {
    createCommentRecipe,
    getAllRecipeComment,
    createCommentNovel,
    getAllNovelComment,
    createCommentCocktail,
    getAllCocktailComment,
} from '../controllers/comments.controllers';
const router: Router = Router();
const auth:RequestHandler = authenticate;

/**
 * Route for Comments
 */
router.post('/recipe', auth, createCommentRecipe);
router.get('/recipe/:id', getAllRecipeComment);
router.post('/novel', auth, createCommentNovel);
router.get('/novel/:id', getAllNovelComment);
router.post('/cocktail', auth, createCommentCocktail);
router.get('/cocktail/:id', getAllCocktailComment);

export default router;