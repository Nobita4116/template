'use strict';
import {authenticateUser, isAuthenticate} from '../../libs/auth/auth';
import {ResponseError, ResponseSuccess} from '../BaseReponse';
import {MidUser} from '../../models/middle';

class LoginController {
    loadForm(req, res) {
        return res.render('login')
    }

    checkLogin(req, res) {
        if (isAuthenticate(req, res)) {
            return res.redirect('/dashboard');
        } else {
            return res.redirect('/login');
        }
    }

    postLogin(req, res) {
        let dataPost = req.body,
            user_name = dataPost.user_name || '',
            password = dataPost.password || '';

        user_name = user_name.trim();
        password = password.trim();

        if (!user_name || !password) {
            return ResponseError(res, 'Require params');
        }

        authenticateUser(req, res, {user_name, password})
            .then(ins => {
                return ResponseSuccess(res, ins);
            })
            .catch(err => {
                return ResponseError(res, err.message);
            });
    }

    postRegister(req, res) {
        let dataPost = req.body
        MidUser.registerUser(dataPost)
            .then(ins => {
                return ResponseSuccess(res, ins);
            })
            .catch(err => {
                return ResponseError(res, err);
            });
    }

}

export default new LoginController