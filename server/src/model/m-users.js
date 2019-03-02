const query = require('../db/db-manager');

UserModel = {
    findBiddersByPage : (pageIndex, pageSize) => {
        let sql = `SELECT * FROM bidder Limit `+ (pageIndex - 1) * pageSize + `,` + pageSize;
        return query(sql);
    },

    findSellersByPage : (pageIndex, pageSize) => {
        let sql = `SELECT * FROM seller Limit `+ (pageIndex - 1) * pageSize + `,` + pageSize;
        return query(sql);
    },

    findBidderByName : (name) => {
        let sql = `SELECT * FROM bidder WHERE bidder_name = "${name}"`;
        return query(sql);
    },

    findSellerByName : (name) => {
        let sql = `SELECT * FROM seller WHERE seller_name = "${name}"`;
        return query(sql);
    }
}


module.exports = UserModel;