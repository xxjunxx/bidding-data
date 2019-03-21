const mItem = require('../model/m-items');
const mBid = require('../model/m-bid');
const mCategory = require('../model/m-category');
const mUser = require('../model/m-users')

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
    },

    postCreateItem : async (ctx) => {
        let itemName = ctx.request.body.itemName;
        let country =  ctx.request.body.country;
        let location = ctx.request.body.location;
        let description =  ctx.request.body.description;
        let isExist = ctx.request.body.isExist;
        let existSellerName =  ctx.request.body.existSellerName;
        let newSellerName =  ctx.request.body.newSellerName;
        let newRating =  ctx.request.body.newRating;

        let itemId;

        await mItem.findMaxItemId()
            .then(result => {
                itemId = result[0].max + 1;
            });
        
        if (!isExist) {
            await mUser.insertSeller(newSellerName, newRating);

            await mItem.insertItem(itemId, itemName, country, newSellerName, description);
        } else {
            await mItem.insertItem(itemId, itemName, country, existSellerName, description);
        }

        if (location) {
            await mItem.insertItemLocation(itemId, location);
        }
        ctx.response.body = await [{result: "success", itemId: itemId}];
    }
}

module.exports = ItemsController;