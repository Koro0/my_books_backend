import {Router, RequestHandler}  from 'express';
import authenticate from '../middlewares/auth';

import { 
    createCocktail,
    deleteCocktail,
    getAllCocktails,
    getOneCocktail,
 } from '../controllers/Recipe/cocktail.controllers';

 const multer = require('../middlewares/multer-config');
 const router: Router = Router();
 const auth:RequestHandler = authenticate;

 
router.post('/', multer, auth, createCocktail);
router.get('/',  getAllCocktails);
router.get('/:id', getOneCocktail);
router.delete('/:id/:userId', auth, deleteCocktail);
export default router;