const query = require('../db/db-manager');

ItemModel = {
    findItemsByPage : (pageIndex, pageSize) => {
        let sql = `SELECT * FROM item LIMIT ` + (pageIndex - 1) * pageSize + `,` + pageSize;
        return query(sql);
    },

    findItemById : (id) => {
        let sql = `SELECT * FROM item WHERE item_id = ${id}`;
        return query(sql);
    },

    insertItem : (itemId, itemName, country, seller_name, description) => {
        let sql = `INSERT INTO item (item_id, item_name, country_name, seller_name, description)
        VALUES ("${itemId}", "${itemName}", "${country}", "${seller_name}", "${description}");`;
        return query(sql);
    },

    findMaxItemId : ()=> {
        let sql = `SELECT MAX(item_id) as max FROM item`;
        return query(sql);
    },

    insertItemLocation : (itemId, location) => {
        let sql = `INSERT INTO item_location (item_id, location_name) VALUES ("${itemId}", "${location}");`;
        return query(sql);
    }
}


module.exports = ItemModel;