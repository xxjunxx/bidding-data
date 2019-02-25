const query = require('../db/db-manager');

UserModel = {
    findAllBidders : () => {
        let sql = `SELECT * FROM bidder`;
        return query(sql);
    },

    findAllSellers : () => {
        let sql = `SELECT * FROM seller`;
        return query(sql);
    }
}


module.exports = UserModel;