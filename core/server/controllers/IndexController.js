import ControllerBase from './ControllerBase';
import {isAuthenticate, getUserCurrent} from '../libs/auth/auth';
import path from 'path';
import {encrypt, decrypt} from '../libs/common/encryption';

/**
 * IndexController
 * 
 * @export
 * @class IndexController
 * @extends {ControllerBase}
 */
export default class IndexController extends ControllerBase {

    /**
     * Index page
     * 
     * @static
     * @param {any} req 
     * @param {any} res 
     * @memberof IndexController
     */
    static index(req, res) {
        res.send('indexAction page');
    }

    /**
     * About page
     * 
     * @static
     * @param {any} req 
     * @param {any} res 
     * @memberof IndexController
     */
    static about(req, res) {
        res.send('aboutAction page');
    }

    static login(req, res) {
        if (isAuthenticate(req, res)) {
            res.send('is logged in!');
        } else {
            return res.sendFile(path.join(__dirname, '../../../public/main.html'));
        }
    }

    static encrypts(req, res) {
        res.send(encrypt('abc'));
    }

    static decrypts(req, res) {
        res.send(decrypt('a274a5bd7ec18e9213b2218d10589bf8:fd05d67aefdee15707be2cd61012dbd1'));
    }


}