const query = require('../db/db-manager');

BidModel = {

    findAuctionByItemId : () => {
        let sql = `SELECT * FROM bid limit 1`;
        return query(sql);
    }
}


module.exports = BidModel;