const query = require('../db/db-manager');

ItemModel = {
    findItemsByPage : (pageIndex, pageSize) => {
        let sql = `SELECT * FROM item LIMIT ` + (pageIndex - 1) * pageSize + `,` + pageSize;
        return query(sql);
    },

    findItemById : (id) => {
        let sql = `SELECT * FROM item WHERE item_id = ${id}`;
        return query(sql);
    }
}


module.exports = ItemModel;