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
    },
    
    findSellerByNameElastic : (name, num) => {
        let sql = `SELECT * FROM seller WHERE seller_name LIKE "${name}%" LIMIT 0,${num}`;
        return query(sql);
    },

    insertSeller : (name, rating) => {
        let sql = `INSERT INTO seller (seller_name, rating) VALUES ("${name}", "${rating}");`;
        return query(sql);
    },
}


module.exports = UserModel;