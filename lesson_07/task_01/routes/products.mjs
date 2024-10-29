import { Router } from 'express';
import multer from 'multer';
import ProductsController from '../controllers/products-controller.mjs';
import ProductValidation from '../models/product-validation.mjs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
      const uniqueId = uuidv4();
      const extension = path.extname(file.originalname);
      cb(null, `${uniqueId}${extension}`);
  }
});

const upload = multer({ storage });
const router = Router();

router.get('/', ProductsController.renderProductsList);
router.get('/add', ProductsController.renderAddProductForm);
router.post(
  '/add',
  upload.single('photo'),
  ProductValidation.addProductValidation(),
  ProductsController.addProduct
);
router.get('/edit/:productId', ProductsController.renderEditProductForm);
router.put('/edit', 
  upload.single('photo'),
  ProductValidation.addProductValidation(),
  ProductsController.updateProduct
);
router.delete('/', ProductsController.removeProduct);
router.get('/:productId', ProductsController.renderProductDetails);

export default router;