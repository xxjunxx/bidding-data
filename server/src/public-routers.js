const Router = require('koa-router');
const cAdmins = require('./controller/c-admins');

const PublicRouter = new Router();

PublicRouter.post('/register', cAdmins.postRegister);

PublicRouter.post('/login', cAdmins.postLogin);


module.exports = PublicRouter;
