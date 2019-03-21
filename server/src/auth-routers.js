const Router = require('koa-router');
const cItems = require('./controller/c-items');
const cUsers = require('./controller/c-users');


const AuthRouter = new Router();

AuthRouter.post('/items', cItems.getItemsByPage);

AuthRouter.get('/items/:itemId', cItems.getSingleItem);

AuthRouter.post('/items/:itemId/bids', cItems.getBidsByItem);

AuthRouter.get('/users/:userName', cUsers.getSingleUser);

AuthRouter.post('/bidders', cUsers.getBiddersByPage);

AuthRouter.post('/bidders/:userName/bids', cUsers.getBidsByName);

AuthRouter.post('/sellers', cUsers.getSellersByPage);

AuthRouter.post('/sellers/:userName/auctions', cUsers.getAuctionsBySellerName);

AuthRouter.post('/item-create', cItems.postCreateItem);

AuthRouter.post('/search/sellers/', cUsers.getSellersByName);

module.exports = AuthRouter;
