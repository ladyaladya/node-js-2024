import ProductsDBService from './../services/product-db-service.mjs';
import { validationResult } from 'express-validator';

class ProductsController {
  static async renderProductsList(req, res) {
    const products = (await ProductsDBService.getList()).map(product => product.toObject());
    res.render('products/products-list', { 
      metaTitle: 'Продукти - Магазин для домашніх тварин',
      products: products,
      cssFilePath: 'products/products-list',
    });
  }

  static renderAddProductForm(req, res) {
    res.render('products/add-product', { 
      metaTitle: 'Додати продукт - Магазин для домашніх тварин',
      cssFilePath: 'products/add-product', 
    });
  }

  static async addProduct(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('products/add-product', {
        errors: errors.array(),
        oldData: req.body,
        metaTitle: 'Додати продукт - Магазин для домашніх тварин',
        cssFilePath: 'products/add-product', 
      });
    }

    const product = req.body;
    if (req.file) {
      product['imagePath'] = req.file.filename;
    }
    await ProductsDBService.create(product);
    res.redirect(`/products/?message=${product.brand} успішно додано.`);
  }

  static async renderEditProductForm(req, res) {
    const productId = req.params.productId;
    const product = await ProductsDBService.getById(productId);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.render('products/edit-product', {
      product: product.toObject(),
      metaTitle: 'Оновити продукт - Магазин для домашніх тварин',
      cssFilePath: 'products/edit-product', 
    });
  }

  static async updateProduct(req, res) {
    const errors = validationResult(req);
    const product = req.body;
    if (req.file) {
      product['imagePath'] = req.file.filename;
    }
    if (!errors.isEmpty()) {
      return res.render('products/edit-product', {
        errors: errors.array(),
        product,
        metaTitle: 'Оновити продукт - Магазин для домашніх тварин',
        cssFilePath: 'products/edit-product', 
      });
    }

    await ProductsDBService.update(product._id, product);
    res.redirect(`/products/?message=${product.brand} успішно оновлено.`);
  }

  static async removeProduct(req, res) {
    const productId = req.body.id;
    if (!productId) {
      return res.status(404).send('Product not found');
    }
    
    await ProductsDBService.deleteById(productId);
    res.status(200).send('Operation successful');
  }

  static async renderProductDetails(req, res) {
    const productId = req.params.productId;
    const product = await ProductsDBService.getById(productId);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.render('products/product-details', {
      metaTitle: `${product.brand} ${product.model}`,
      product: product.toObject(),
      cssFilePath: 'products/product-details',
    });
  }
}

export default ProductsController;