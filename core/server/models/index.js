export { default as User } from './User';

export { default as CodeForgot } from './CodeForgot'

import { sequelize } from '../connections';

// Init association
for (let m in sequelize.models) {
    sequelize.models[m].association();
}