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
}

export default ProductsController;
