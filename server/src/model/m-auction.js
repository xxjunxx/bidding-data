const query = require('../db/db-manager');

BidModel = {
    countAuctionsBySellerName : (name) => {
        let sql = `SELECT COUNT(*) AS count FROM item
                    JOIN auction ON item.item_id = auction.item_id
                    WHERE seller_name = "${name}"`;
        return query(sql); 
    },
    findAuctionsBySellerName: (name, pageIndex, pageSize) => {
        let sql = `SELECT * FROM item  
                    JOIN auction ON item.item_id = auction.item_id
                    where seller_name = "${name}"
                    LIMIT ` + (pageIndex - 1) * pageSize + `, ${pageSize}`;
        return query(sql);
    }
}


module.exports = BidModel;