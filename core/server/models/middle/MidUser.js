'use strict';
import User from '../User';
import CodeForgot from '../CodeForgot'
import {
    validateEmail
} from '../../libs/common/validate';
import {
    generateRandomString
} from '../../utils/random'
import {
    sendMailForgot
} from '../../libs/common/mail'

class MidUser {
    // async checkPassword(email, password) {
    //     let user = await Users.getUserByEmail(email);
    //     if (!user) {
    //         throw new Error('Email incorrect!');
    //     }

    //     if (!user.checkPassword(password)) {
    //         throw new Error('Password incorrect!');
    //     }

    //     return true;
    // }

    // async checkEmail(email) {
    //     let user = await Users.getUserByEmail(email);
    //     if (!user) {
    //         throw new Error('Email incorrect!');
    //     }
    //     return true;
    // }

    // async forgotPassword(email) {
    //     let user = await Users.getUserByEmail(email);
    //     if (!user) {
    //         throw new Error('Email incorrect!');
    //     }

    //     let code = generateRandomString(32)

    //     let dataForgot = {
    //         email,
    //         del: 0,
    //         code
    //     }

    //     let forgot = await CodeForgot.create(dataForgot)
    //     sendMailForgot(code, email)
    //     return 'success'
    // }

    // async resetPassword(dataPost) {
    //     if (!dataPost.code || !dataPost.password) {
    //         throw new Error('Require params')
    //     }

    //     let codeData = await this.getCodeForgot(dataPost.code)
    //     if (!codeData) {
    //         throw new Error('Yêu cầu của bạn hết hạn hoặc không hợp lệ')
    //     }

    //     let email = codeData.email
    //     let userData = await this.getUserByEmail(email)
    //     if (!userData) {
    //         throw new Error('Yêu cầu của bạn hết hạn hoặc không hợp lệ')
    //     }

    //     userData.setPassword(dataPost.password)
    //     let user_update = await userData.save()
    //     return user_update
    // }

    // getCodeForgot(code) {
    //     return CodeForgot.findOne({
    //         where: {
    //             code
    //         }
    //     })
    // }

    // changeAccount(fullname, mobile, avatar, user) {
    //     return new Promise((resolve, reject) => {
    //         user.update({
    //             fullname,
    //             mobile,
    //             avatar
    //         })
    //             .then(ins => resolve(ins))
    //             .catch(err => reject(err));
    //     });
    // }

    // getUserByEmail(email) {
    //     return Users.getUserByEmail(email);
    // }

    createUser(data) {
        return Users.create(data);
    }

    async registerUser(data) {
        try {
            let {
                user_name
            } = data
            let users = await User.getUserByUserName(user_name);
            if (users) {
                throw new Error('Tên người dùng đã tồn tại');
            }

            let dataReg = Object.assign(data, {
                status: 0,
                del: 0
            })
            return User.create(dataReg)
        } catch(err) {
            throw new Error(err)
        }
}
}

export default new MidUser()