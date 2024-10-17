// Задача 4. З використанням роутерів та шаблонізаторів розробити інтернет магазин з такими сторінками:
// 1) about – як статична сторінка (розмістити у public)
// 2) сторінка додавання продукту (поки лише відображаємо поля для заповнення інформації)
// 3) сторінка відображення продуктів (у формі таблиці і списку)
// 4) головна – знаходяться посилання на сторінки about і products і addproducts

import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import indexRoutes from './routes/index.mjs';
import productRoutes from './routes/products.mjs';
import InMemoryProductService from './services/products-service.mjs';

const app = express();
app.engine('hbs', engine({
  extname: 'hbs',
  defaultLayout: 'main',
  partialsDir: 'views/partials',
}));
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: true }));

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);
app.set('views', path.join(__dirName, 'views'));

const absoluteStaticPath = path.join(__dirName, 'public');
app.use('/static', express.static(absoluteStaticPath, {
  etag: true
}));

app.use('/', indexRoutes({ absoluteStaticPath }));

app.use('/products', productRoutes({ productService: new InMemoryProductService() }));

app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.listen(3000, () => {
  console.log('Server started.');
})