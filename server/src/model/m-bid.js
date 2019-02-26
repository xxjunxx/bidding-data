const query = require('../db/db-manager');

BidModel = {

    countByItemId : (itemId) => {
        let sql = `SELECT COUNT(*) AS count FROM bid where item_id = ${itemId}`;
        return query(sql);
    },
    findItemsByItemId: (itemId, pageIndex, pageSize) => {
        let sql = `SELECT * FROM bid where item_id = ${itemId} LIMIT ` + (pageIndex - 1) * pageSize + `, ${pageSize}`;
        return query(sql);
    }

}


module.exports = BidModel;