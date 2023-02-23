import {Router}  from 'express';
import {
    createRecipe
} from '../controllers/Recipe/recipe.controllers';

const multer = require('../middlewares/multer-config');
const router = Router();

router.post('/', multer, createRecipe);

export default router;