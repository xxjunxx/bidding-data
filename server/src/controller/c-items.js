const mItem = require('../model/m-items');

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
        let itemId = ctx.params.itemId,
        res;
        await mItem.findItemById(itemId)
            .then(result => {
                res = result;
            });
        ctx.response.body = await res;
    }
}

module.exports = ItemsController;