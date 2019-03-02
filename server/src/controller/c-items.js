const mItem = require('../model/m-items');
const mBid = require('../model/m-bid');
const mCategory = require('../model/m-category');

ItemsController = {
    getItemsByPage : async (ctx) => {
        let pageIndex = ctx.request.body.pageIndex;
        let pageSize =  ctx.request.body.pageSize;
        await mItem.findItemsByPage(pageIndex, pageSize)
            .then(res => {
                ctx.response.body = {
                    result: res, 
                    currentPageIndex: pageIndex,
                    nextPageIndex: pageIndex + 1
                };
            });
    },

    getSingleItem : async (ctx) => {
        let itemId = ctx.params.itemId;
        let item;
        await mItem.findItemById(itemId)
            .then(result => {
                item = result;
            });
        await mBid.countByItemId(itemId)
            .then(result => { 
                item[0].bid_count = result[0].count;
            });
        await mCategory.findCategoriesByItem(itemId)
            .then(response => {
                item[0].categories = response;
            });
        ctx.response.body = await item[0];
    },

    getBidsByItem : async (ctx) => {
        let pageIndex = ctx.request.body.pageIndex;
        let pageSize =  ctx.request.body.pageSize;
        let itemId = ctx.params.itemId;
        await mBid.findBidsByItemId(itemId, pageIndex, pageSize)
            .then(result => {
                ctx.response.body = {
                    'result' : result,
                    'currentPageIndex': pageIndex, 
                    'nextPageIndex': pageIndex + 1
                }
            });
    }
}

module.exports = ItemsController;