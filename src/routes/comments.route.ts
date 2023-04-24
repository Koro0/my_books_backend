import {Router, RequestHandler}  from 'express';
import authenticate from '../middlewares/auth';
import authenticateAdmin from '../middlewares/authAdmin';
import {
    createCommentRecipe,
    getAllRecipeComment,
    deleteCommentRecipe,
    createCommentNovel,
    getAllNovelComment,
    deleteNovelComment,
    createCommentCocktail,
    getAllCocktailComment,
    deleteCocktailComment,
} from '../controllers/comments.controllers';
const router: Router = Router();
const auth:RequestHandler = authenticate;
const adminAuth:RequestHandler = authenticateAdmin;

/**
 * Route for Comments
 */
router.post('/recipe', auth, createCommentRecipe);
router.get('/recipe/:id', getAllRecipeComment);
router.delete('/recipe/:id', adminAuth, deleteCommentRecipe);

router.post('/novel', auth, createCommentNovel);
router.get('/novel/:id', getAllNovelComment);
router.get('/novel/:id', adminAuth, deleteNovelComment);

router.post('/cocktail', auth, createCommentCocktail);
router.get('/cocktail/:id', getAllCocktailComment);
router.get('/cocktail/:id', adminAuth, deleteCocktailComment);

export default router;