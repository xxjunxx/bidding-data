const query = require('../db/db-manager');

CategoryModel = {

    findCategoriesByItem : (itemId) => {
        let sql = `SELECT * FROM has_category where item_id = ${itemId}`;
        return query(sql);
    }
}


module.exports = CategoryModel;