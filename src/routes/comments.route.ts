import {Router}  from 'express';

import {
    createCommentRecipe,
    getAllRecipeComment,
    createCommentNovel,
    getAllNovelComment,
    createCommentCocktail,
    getAllCocktailComment,
} from '../controllers/comments.controllers';
const router: Router = Router();

/**
 * Route for Comments
 */
router.post('/comments/recipe', createCommentRecipe);
router.get('/comments/recipe', getAllRecipeComment);
router.post('/comments/novel', createCommentNovel);
router.get('/comments/novel', getAllNovelComment);
router.post('/comments/cocktail', createCommentCocktail);
router.get('/comments/cocktail', getAllCocktailComment);