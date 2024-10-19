import { Router } from 'express';

export default function({ productService }) {
  const router = Router();

  router.get('/', (req, res) => {
    const products = productService.getAllProducts();
    res.render('products/products-list',
      { 
        metaTitle: 'Продукти - Магазин для домашніх тварин',
        products: products,
        cssFilePath: 'products/products-list',
      }
    );
  });

  router.get('/add', (req, res) => {
    res.render('products/add-product',
      { 
        metaTitle: 'Додати продукт - Магазин для домашніх тварин',
        cssFilePath: 'products/add-product',
      }
    );
  });

  router.post('/add', (req, res) => {
    const { name, category, price, brand, country, forPets } = req.body;

    const newProduct = {
      name,
      category,
      price: parseFloat(price),
      brand,
      country,
      forPets
    };

    productService.addProduct(newProduct);
    res.redirect('/products');
  });

  return router;
}
