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
    const product = req.body;
    if (req.file) {
      product['imagePath'] = req.file.filename;
    };
    await ProductsController.productModel.add(product);
    res.redirect(`/products/?message=${product.brand} успішно додано.`);
  }

  static async renderEditProductForm(req, res) {
    const productId = parseInt(req.params.productId);
    const product = await ProductsController.productModel.getById(productId);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.render('products/edit-product', {
      product,
      metaTitle: 'Оновити продукт - Магазин для домашніх тварин',
      cssFilePath: 'products/edit-product', 
    });
  }

  static async updateProduct(req, res) {
    const product = req.body;
    if (req.file) {
      product['imagePath'] = req.file.filename;
    };
    await ProductsController.productModel.update(parseInt(product.id), product);
    res.redirect(`/products/?message=${product.brand} успішно оновлено.`);
  }

  static async removeProduct(req, res) {
    const productId = req.body.id;
    if (!productId) {
      return res.status(404).send('Product not found');
    }
    
    await ProductsController.productModel.delete(productId);
    res.status(200).send('Operation successful');
  }

  static async renderProductDetails(req, res) {
    const productId = parseInt(req.params.productId);
    const product = await ProductsController.productModel.getById(productId);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.render('products/product-details', {
      metaTitle: `${product.brand} ${product.model}`,
      product,
      cssFilePath: 'products/product-details',
    });
  }
}

export default ProductsController;
