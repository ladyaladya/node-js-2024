import { Router } from 'express';
import ProductsController from '../controllers/products-controller.mjs';

const router = Router();

router.get('/', ProductsController.renderProductsList);
router.get('/add', ProductsController.renderAddProductForm);
router.post('/add', ProductsController.addProduct);
router.post('/remove/:productId', ProductsController.removeProduct);
router.get('/:productId', ProductsController.renderProductDetails);

export default router;