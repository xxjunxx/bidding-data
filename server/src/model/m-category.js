const query = require('../db/db-manager');

CategoryModel = {

    findAllCategories : () => {
        let sql = `SELECT DISTINCT category_name FROM has_category limit 1`;
        return query(sql);
    }
}


module.exports = CategoryModel;