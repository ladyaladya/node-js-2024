import Product from '../models/product.mjs';

class ProductsController {
  static productModel = new Product();

  static async renderProductsList(req, res) {
    const products = await ProductsController.productModel.getAll();
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
    await ProductsController.productModel.add(req.body);
    res.redirect('/products');
  }

  static async removeProduct(req, res) {
    const productId = parseInt(req.params.productId);
    const product = await ProductsController.productModel.getById(productId);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    
    await ProductsController.productModel.delete(productId);
    res.redirect('/products');
  }

  static async renderProductDetails(req, res) {
    const productId = parseInt(req.params.productId);
    const product = await ProductsController.productModel.getById(productId);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.render('products/product-details', {
      metaTitle: `${product.name}`,
      product,
      cssFilePath: 'products/product-details',
    });
  }
}

export default ProductsController;
