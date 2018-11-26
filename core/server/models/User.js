import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import randomize from 'randomatic';
import _ from 'lodash';

import { sequelize } from '../connections';
import BaseModel from './BaseModel';

/**
 * Define User Model
 * 
 * @export
 * @class User
 * @extends {BaseModel}
 */
export default class User extends BaseModel {

    /**
     * Check password
     * 
     * @param {String} password 
     * @returns {Boolean}
     * @memberof User
     */
    checkPassword(password) {
        return bcrypt.compareSync(password, this.password);
    }

    /**
     * Set password
     * 
     * @param {any} password 
     * @memberof User
     */
    setPassword(password) {
        this.password = bcrypt.hashSync(password, 10);
    }

    hashPassword(password) {
        return bcrypt.hashSync(password, 10);
    }

    /**
     * Get user by user_name
     * 
     * @static
     * @param {any} user_name
     * @returns 
     * @memberof User
     */
    static getUserByUserName(user_name) {
        return this.findOne({
            where: {
                user_name,
                del: 0
            }
        });
    }

    /**
     * Get user by id
     * 
     * @static
     * @param {any} id
     * @returns 
     * @memberof User
     */
    static getUserById(id) {
        return this.findOne({
            where: {
                id,
                del: 0
            }
        });
    }
}

/**
 * Hook before create
 * @param {User} user 
 */
const beforeCreate = (user) => {
    if (user.password) {
        user.setPassword(user.password);
    }
};

/**
 * Hooks option
 */
const hooks = {
    beforeCreate
}

/**
 * Attributes model
 */
const attributes = {
    id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    user_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: ''
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    token: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: ''
    },
    status: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 0
    },
    del: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 0
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
};

/**
 * Options model
 */
const options = {
    tableName: 'user',
    hooks
};

/**
 * Init Model
 */
User.init(attributes, { ...options, sequelize });