import { Router } from 'express';
import { LoginController, UserController } from '../../controllers/admin';
import { authLogin, isAuth } from '../../middlewares/auth';
import user from './user'
const router = new Router();

router.get('/', LoginController.checkLogin);

router.use('/', user)

router.get('/*', isAuth, UserController.loadForm)

export default router;