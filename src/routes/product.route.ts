import { Router, RequestHandler } from 'express';
import authenticate from '../middlewares/authAdmin';

import { createProduct, getAllProd } from '../controllers/product/product.ctrl';

const multer = require('../middlewares/multer-config');
const router: Router = Router();
const auth: RequestHandler = authenticate;

router.post('/', multer, auth, createProduct);
router.get('/', multer, getAllProd);

export default router;
