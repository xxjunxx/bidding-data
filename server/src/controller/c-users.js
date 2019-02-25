const mUser = require('../model/m-users');

UserController = {
    getAllBidders : async (ctx) => {
        let res;
        await mUser.findAllBidders()
            .then(result => {
                res = result;
            });
        ctx.response.body = await res;
    }
}

module.exports = UserController;