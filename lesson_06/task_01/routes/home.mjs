import { Router } from 'express';
import HomeController from '../controllers/home-controller.mjs';

const router = Router();

router.get('/', HomeController.renderHomepage);
router.get('/about', HomeController.renderAboutPage);

export default router;
