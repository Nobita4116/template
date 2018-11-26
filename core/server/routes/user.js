import { Router } from 'express';
import { LoginController, UserController } from '../controllers/admin';
import { authLogin, isAuth } from '../middlewares/auth';
const router = new Router();

router.get('/', LoginController.checkLogin);

// router.get('/dashboard', authLogin, LoginController.loadForm);

router.get('/login',authLogin,  LoginController.loadForm);

router.get('/register', LoginController.loadForm);

// router.get('/reset-password/:code', authLogin, LoginController.loadForm);

// router.get('/forgot-password', authLogin, LoginController.loadForm);

// router.post('/checkReset', LoginController.checkCodeForgot);

router.post('/login', LoginController.postLogin);

router.post('/register', LoginController.postRegister);

// router.post('/forgotpassword', LoginController.forgotPassword);

// router.post('/resetPassword', LoginController.resetPassword);

router.get('/logout', UserController.userLogout);

router.get('/*', isAuth, UserController.loadForm)

export default router;
