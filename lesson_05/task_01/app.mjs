// Задача. За прикладом, який ми розглянули на уроці розробити додаток з такими операціями стосовно контексту, який ви виберете:
// відображення списку елементів
// відображення детальної інформації про елемент маючи id
// додавання нового елемента
// потім додамо редагування
// потім додамо видалення

import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import homeRouter from './routes/home.mjs';
import productRouter from './routes/products.mjs';

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