const Router = require('koa-router');
const cItems = require('./controller/c-items');
const cUsers = require('./controller/c-users');

const router = new Router();

router.get('/items', cItems.getAllItems);

router.get('/items/:itemId', cItems.getSingleItem);

router.get('/bidders', cUsers.getAllBidders);
module.exports = router;