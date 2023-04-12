import {Router}  from 'express';
import {
    createRecipe,
    getAllRecipe,
} from '../controllers/Recipe/recipe.controllers';

import { createCocktail,
    deleteCocktail,
    getAllCocktails,
    getOneCocktail,
 } from '../controllers/Recipe/cocktail.controllers';

const multer = require('../middlewares/multer-config');
const router: Router = Router();

router.post('/', multer, createRecipe);
router.get('/',  getAllRecipe);

router.post('/cocktail', multer, createCocktail);
router.get('/cocktail',  getAllCocktails);
router.get('/cocktail/:id', getOneCocktail);
router.delete('/cocktail/:id', deleteCocktail);
export default router;