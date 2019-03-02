const Router = require('koa-router');
const cItems = require('./controller/c-items');
const cUsers = require('./controller/c-users');

const router = new Router();

router.post('/items', cItems.getItemsByPage);

router.get('/items/:itemId', cItems.getSingleItem);

router.post('/items/:itemId/bids', cItems.getBidsByItem);

router.get('/users/:userName', cUsers.getSingleUser);

router.post('/bidders', cUsers.getBiddersByPage);

router.post('/bidders/:userName/bids', cUsers.getBidsByName);

router.post('/sellers', cUsers.getSellersByPage);

router.post('/sellers/:userName/auctions', cUsers.getAuctionsBySellerName);

module.exports = router;