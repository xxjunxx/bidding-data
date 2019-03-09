const query = require('../db/db-manager');

AdminModel = {

    insertAdmin : (email, password) => {
        let sql = `INSERT INTO admin (email, password) VALUES ("${email}", "${password}") `;
        return query(sql);
    },

    findAdminByEmail : (email) => {
        let sql = `SELECT * FROM admin WHERE email = "${email}"`
        return query(sql);
    },

    findAdminByEmailAndPass : (email, password) => {
        let sql = `SELECT * FROM admin WHERE email = "${email}" AND password = "${password}"`;
        return query(sql);
    }
}


module.exports = AdminModel;