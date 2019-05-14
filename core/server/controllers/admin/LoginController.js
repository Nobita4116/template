'use strict';
import {authenticateUser, isAuthenticate} from '../../libs/auth/auth';
import {ResponseError, ResponseSuccess} from '../BaseReponse';
import {MidUser} from '../../models/middle';

class LoginController {

    checkLogin(req, res) {
        if (isAuthenticate(req, res)) {
            return res.redirect('/dashboard');
        } else {
            return res.redirect('/login');
        }
    }

}

export default new LoginController