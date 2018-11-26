import { Router } from 'express';
import { LoginController } from '../controllers/admin';

const router = new Router();

router.get('/', LoginController.loadForm) ;


export default router ;