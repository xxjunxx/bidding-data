const mItem = require('../model/m-items');

ItemsController = {
    getAllItems : async (ctx) => {
        let res;
        await mItem.findAllItems()
            .then(result => {
                res = result;
            });
        ctx.response.body = await res;
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