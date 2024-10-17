import { Router } from 'express';
import path from 'path';

export default function({ absoluteStaticPath }) {
  const router = Router();

  router.get('/', (req, res) => {
    res.render('home/index', { metaTitle: 'Магазин для домашніх тварин' });
  });

  router.get('/about', (req, res) => {
    res.sendFile(path.join(absoluteStaticPath, 'pages/about.html'));
  });

  return router;
}
