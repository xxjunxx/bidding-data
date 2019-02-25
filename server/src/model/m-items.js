const query = require('../db/db-manager');

ItemModel = {
    findAllItems : () => {
        
        let sql = `SELECT * FROM item limit 0,20`;
        return query(sql);
    },

    findItemById : (id) => {
        let sql = `SELECT * FROM item WHERE item_id = ${id}`;
        return query(sql);
    }
}


module.exports = ItemModel;