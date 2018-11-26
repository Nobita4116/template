'use strict';

import _ from 'lodash';
import {User} from '../../models';
import {encrypt, decrypt} from '../common/encryption';
import {
    generateRandomString
} from '../../utils/random'

const VEGETABLE_KEY_SESSION_AUTH = 'auth_identity';
const VEGETABLE_KEY_COOKIES_AUTH = 'taki-auth';
const VEGETABLE_COOKIES_LIFETIME = 30 * 24 * 3600 * 1000;

let is_authenticated = false;

let self = module.exports = {
    authenticateUser: async(req, res, credentials) => {
        let user_instance = await User.getUserByUserName(credentials.user_name);
        if (!user_instance || !user_instance.id) {
            throw new Error('Tài khoản không tồn tại.');
        }

        if (!user_instance.status)
            throw new Error('Tài khoản chưa kích hoạt');

        if (!user_instance.password || !user_instance.checkPassword(credentials.password)) {
            throw new Error('Mật khẩu không đúng, vui lòng thử lại.');
        } 

        let token = generateRandomString(32)
        let userUpdate = await user_instance.update({token})
        self.setCookies(res, VEGETABLE_KEY_COOKIES_AUTH, JSON.stringify(_.pick(userUpdate, ['id', 'user_name', 'token'])));
        self.setIdentity(req, userUpdate);
        return true
    },

    loginUser :(req, res, users) => {
        self.setCookies(res, VEGETABLE_KEY_COOKIES_AUTH, JSON.stringify(_.pick(users, ['id', 'email', 'token'])));
        self.setIdentity(req, users);
    },

    setCookies : (res, key, data, lifeTime = VEGETABLE_COOKIES_LIFETIME, path='/', httpOnly = true) => {
        let dataEncrypt = encrypt(data);
        res.cookies.set(key, dataEncrypt, {maxAge: lifeTime, httpOnly: httpOnly});
    },

    setIdentity(req, user) {
        req.session[VEGETABLE_KEY_SESSION_AUTH] =  _.pick(user, ['id', 'email', 'token']);
    },

    async checkTokenAuth(req, res, dataIdentity) {
        if (!dataIdentity['token'] || !dataIdentity['id']) {
            self.logout(req, res)
            return false
        }

        let user_auth = await User.getUserById(dataIdentity['id'])
        if (!user_auth) {
            self.logout(req, res)
            return false
        }

        if (user_auth.token != dataIdentity['token']) {
            self.logout(req, res)
            return false
        } else {
            return true
        }
    },

    async isAuthenticate(req, res) {
        let dataIdentity = req.session[VEGETABLE_KEY_SESSION_AUTH] || ''
        let dataCookies = res.cookies.get(VEGETABLE_KEY_COOKIES_AUTH) || ''

        if (dataIdentity) {
            let isCheck = await self.checkTokenAuth(req, res, dataIdentity)
            if (isCheck) {
                if (!dataCookies) {
                    self.setCookies(res, VEGETABLE_KEY_COOKIES_AUTH, JSON.stringify(dataIdentity))
                }
                return true
            } else {
                return false
            }
            
        } else {
            if (!dataCookies)
                return false
            else {
                let dataUser = JSON.parse(decrypt(dataCookies))
                let isCheck = await self.checkTokenAuth(req, res, dataUser)
                if (isCheck) {
                    self.setIdentity(req, dataUser)
                    return true
                } else {
                    return false
                }
            }
        }
    },

    getUserCurrent(req) {
        return new Promise((resolve, reject) => {
            let dataIdentity = req.session[VEGETABLE_KEY_SESSION_AUTH] || '';
            if (!dataIdentity || !dataIdentity.id) {
                resolve(false);
            }

            return User.getUserById(dataIdentity.id).then(users => resolve(users))
                .catch(err => reject(err));
        });
        
    },

    removeCookies(res) {
        res.clearCookie(VEGETABLE_KEY_COOKIES_AUTH);
    },

    logout(req, res) {
        self.removeCookies(res);
        req.session.destroy();
    }
}