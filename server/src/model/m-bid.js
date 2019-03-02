const query = require('../db/db-manager');

BidModel = {

    countByItemId : (itemId) => {
        let sql = `SELECT COUNT(*) AS count FROM bid where item_id = ${itemId}`;
        return query(sql);
    },
    findBidsByItemId: (itemId, pageIndex, pageSize) => {
        let sql = `SELECT * FROM bid JOIN item ON item.item_id = bid.item_id
                    WHERE bid.item_id = ${itemId} LIMIT ` + (pageIndex - 1) * pageSize + `, ${pageSize}`;
        return query(sql);
    },
    countByBidderName : (name) => {
        let sql = `SELECT COUNT(*) AS count FROM bid where bidder_name = "${name}"`;
        return query(sql); 
    },
    findBidsByBidderName: (name, pageIndex, pageSize) => {
        let sql = `SELECT * FROM bid JOIN item ON item.item_id = bid.item_id
                    WHERE bidder_name = "${name}" LIMIT ` + (pageIndex - 1) * pageSize + `, ${pageSize}`;
        return query(sql);
    },

}


module.exports = BidModel;