import {Router, RequestHandler}  from 'express';
import authenticate from '../middlewares/auth';
import {
    createRecipe,
    getAllRecipe,
    getOneRecipe,
    deleteRecipe,
} from '../controllers/Recipe/recipe.controllers';

import { 
    createCocktail,
    deleteCocktail,
    getAllCocktails,
    getOneCocktail,
 } from '../controllers/Recipe/cocktail.controllers';

const multer = require('../middlewares/multer-config');
const router: Router = Router();
const auth:RequestHandler = authenticate;

router.post('/', multer, auth, createRecipe);
router.get('/',  getAllRecipe);
router.get('/id',  getOneRecipe);
router.delete('/id', auth,  deleteRecipe);

router.post('/cocktail', multer, auth, createCocktail);
router.get('/cocktail',  getAllCocktails);
router.get('/cocktail/:id', getOneCocktail);
router.delete('/cocktail/:id', auth, deleteCocktail);
export default router;