import { Router } from 'express';
import { LoginController, UserController } from '../../controllers/admin';
import { authLogin, isAuth } from '../../middlewares/auth';
const router = new Router();

router.get('/', LoginController.checkLogin);

router.get('/*', isAuth, UserController.loadForm)

export default router;