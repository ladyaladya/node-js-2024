// Задача 1. Розробити додаток для автопарку (марка авто, рік випуску, номер, зображення) з такими функціональними можливостями:
// 1)додавання транспортного засобу
// 2)редагування
// 3)видалення
// 4)виведення списку
// Також є статичні сторінки:
// Home
// about

import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import homeRouter from './routes/home.mjs';
import productRouter from './routes/products.mjs';
import methodOverride from 'method-override';

const app = express();
app.engine('hbs', engine({
  extname: 'hbs',
  defaultLayout: 'main',
  partialsDir: 'views/partials',
}));
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);
app.set('views', path.join(__dirName, 'views'));

const absolutePublicStaticPath = path.join(__dirName, 'public');
const absoluteUploadsStaticPath = path.join(__dirName, 'uploads');
app.use('/static', express.static(absolutePublicStaticPath, { etag: true }));
app.use('/static', express.static(absoluteUploadsStaticPath, { etag: true }));

app.use('/', homeRouter);
app.use('/products', productRouter);

app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.listen(3000, () => {
  console.log('Server started.');
})