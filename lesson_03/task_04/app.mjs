import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import InMemoryProductService from './services/products-service.mjs';

const app = express();
const productService = new InMemoryProductService();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.use(express.urlencoded({ extended: true }));

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);
app.set('views', path.join(__dirName, 'views'));

const absoluteStaticPath = path.join(__dirName, 'public');
app.use('/static', express.static(absoluteStaticPath, {
  etag: true
}));

app.get('/', (req, res) => {
  res.render('home', { metaTitle: 'Магазин для домашніх тварин' });
});

app.get('/products', (req, res) => {
  const products = productService.getAllProducts();
  res.render('products', { metaTitle: 'Продукти - Магазин для домашніх тварин', products: products });
});

app.get('/products/add', (req, res) => {
  res.render('add_product', { metaTitle: 'Додати продукт - Магазин для домашніх тварин' });
});

app.post('/products/add', (req, res) => {
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

app.get('/about', (req, res) => {
  res.sendFile(path.join(absoluteStaticPath, 'pages/about.html'));
});

app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.listen(3000, () => {
  console.log('Server started.');
})