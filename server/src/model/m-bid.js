const query = require('../db/db-manager');

BidModel = {

    countByItemId : (itemId) => {
        let sql = `SELECT COUNT(*) AS count FROM bid where item_id = ${itemId}`;
        return query(sql);
    
    }
}


module.exports = BidModel;