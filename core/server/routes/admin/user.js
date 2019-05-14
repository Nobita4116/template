import { Router } from 'express';
import { LoginController, UserController } from '../../controllers/admin';
const router = new Router();

router.get('/', LoginController.checkLogin);

router.get('/*', UserController.loadForm)

export default router;
