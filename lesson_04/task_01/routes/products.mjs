import { Router } from 'express';
import ProductsController from '../controllers/products-controller.mjs';

const router = Router();

router.get('/', ProductsController.renderProductsList);
router.get('/add', ProductsController.renderAddProductForm);
router.post('/add', ProductsController.addProduct);

export default router;