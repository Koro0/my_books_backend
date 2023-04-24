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

 
router.post('/cocktail', multer, auth, createCocktail);
router.get('/cocktail',  getAllCocktails);
router.get('/cocktail/:id', getOneCocktail);
router.delete('/cocktail/:id_:userId', auth, deleteCocktail);
export default router;