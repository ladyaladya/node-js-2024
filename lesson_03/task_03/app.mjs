import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const __fileName = fileURLToPath(import.meta.url);
const __dirName = dirname(__fileName);
const absolutePath = path.join(__dirName, 'public');

app.get('/', (req, res) => {
  res.send('Hello, dear user!');
});

app.get('/goals', (req, res) => {
  res.send('Please tell me about your goals :)');
});

app.get('/about', (req, res) => {
  const pagePath = path.join(absolutePath, 'about.txt');
  res.sendFile(pagePath);
});

app.get('/news', (req, res) => {
  const pagePath = path.join(absolutePath, 'news.txt');
  res.sendFile(pagePath);
});

app.get('/info/:myLink', (req, res) => {
  const myLink = req.params["myLink"];
  const linkToPagePathMap = {
    ['sites']: 'sites.html',
    ['films']: 'online-media.html',
    ['me']: 'about.html',
  };

  if (!linkToPagePathMap[myLink]) {
    res.status(404).send('Page not found');
  }

  const pagePath = path.join(absolutePath, linkToPagePathMap[myLink]);
  res.sendFile(pagePath);
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