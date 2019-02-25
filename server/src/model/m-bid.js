const query = require('../db/db-manager');

BidModel = {

    findAllBids : () => {
        let sql = `SELECT * FROM bid limit 1`;
        return query(sql);
    }
}


module.exports = BidModel;