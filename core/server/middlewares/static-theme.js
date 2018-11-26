'use strict';

import express from 'express';
import path from 'path';
import {MidSetting} from '../models/middle';
import {getContentPath, getConstantApp} from '../libs/common';
import {loadOneTheme} from '../libs/theme/loader';

export const initStaticTheme = () => {
    return function setStatic(req, res, next) {
        let appId = req.params.appId || getConstantApp('app_default');
        MidSetting.getThemeActive(appId)
        .then(theme => {
            if (theme) {
                loadOneTheme(theme)
                    .then(themeData => {
                        return express.static(path.join(themeData.path , 'assets'))(req, res, next);
                    })
                    .catch(err => {
                        next(err);
                    });
            } else {
                next(new Error('Require themes'));
            }
        })
        .catch(err => {
            next(err);
        });
    }
}