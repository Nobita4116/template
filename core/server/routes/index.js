import { Router } from 'express';
import { initStaticAdmin, initStaticUpload } from '../middlewares/static';
import { isCanPost } from '../middlewares/auth'

import upload from './upload';
import user from './user'
import container from './container'
import distributor from './distributor'
import order from './order'
import product from './product'
import provider from './provider'
import supermarket from './supermarket'

let siteApp = new Router();

siteApp.use(initStaticAdmin())

siteApp.use('/uploads', initStaticUpload())

siteApp.use('/upload', upload)

siteApp.use('/', user)

siteApp.use('/container', container)

siteApp.use('/distributor', distributor)

siteApp.use('/order', order)

siteApp.use('/product', product)

siteApp.use('/provider', provider)

siteApp.use('/supermarket', supermarket)

export default siteApp;