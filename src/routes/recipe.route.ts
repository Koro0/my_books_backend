import {Router}  from 'express';
import {
    createRecipe,
    getAllRecipe,
} from '../controllers/Recipe/recipe.controllers';

const multer = require('../middlewares/multer-config');
const router: Router = Router();

router.post('/', multer, createRecipe);
router.get('/',  getAllRecipe);

export default router;