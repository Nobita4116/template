'use strict';

import {
    getUserCurrent,
    logout,
} from '../../libs/auth/auth';

class UserController {

    loadForm(req, res) {
        getUserCurrent(req, res).then(users => {

            let preloadState = {
                users: {
                    profile: users
                }
            };
            return res.render('main', {
                preloadState
            });
        });
    }

    userLogout(req, res) {
        logout(req, res);
        res.redirect('login');
    }
};

export default new UserController();