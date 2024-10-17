// Задача 2. Розробити серверну частину додатку, який за відповідними маршрутами (“/”, “/coffee”, “/music”) повертає створені HTML документи.

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const __fileName = fileURLToPath(import.meta.url);
const __dirName = dirname(__fileName);
const absolutePath = path.join(__dirName, 'public');

app.get('/', (req, res) => {
  const indexPagePath = path.join(absolutePath, 'about.html');
  res.sendFile(indexPagePath);
});

app.get('/coffee', (req, res) => {
  const coffeePagePath = path.join(absolutePath, 'coffee.html');
  res.sendFile(coffeePagePath);
});

app.get('/music', (req, res) => {
  const musicPagePath = path.join(absolutePath, 'music.html');
  res.sendFile(musicPagePath);
});

app.use('/static', express.static(absolutePath, {
  etag: true
}));

app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.listen(3000, () => {
  console.log('Server started.');
})