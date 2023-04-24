import {Router, RequestHandler}  from 'express';
import authenticate from '../middlewares/auth';
import {
    createRecipe,
    getAllRecipe,
    getOneRecipe,
    deleteRecipe,
} from '../controllers/Recipe/recipe.controllers';


const multer = require('../middlewares/multer-config');
const router: Router = Router();
const auth:RequestHandler = authenticate;

router.post('/', multer, auth, createRecipe);
router.get('/',  getAllRecipe);
router.get('/:id',  getOneRecipe);
router.delete('/:id', auth,  deleteRecipe);

export default router;