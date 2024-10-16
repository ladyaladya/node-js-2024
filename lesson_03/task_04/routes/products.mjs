import { Router } from 'express';

export default function({ productService }) {
  const router = Router();

  router.get('/', (req, res) => {
    const products = productService.getAllProducts();
    res.render('products', { metaTitle: 'Продукти - Магазин для домашніх тварин', products: products });
  });

  router.get('/add', (req, res) => {
    res.render('add_product', { metaTitle: 'Додати продукт - Магазин для домашніх тварин' });
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
