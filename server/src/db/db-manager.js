const dbConfig = require('./db-config');
const mysql = require('mysql');

let pool = mysql.createPool({
    host : dbConfig.host,
    user : dbConfig.user,
    password : dbConfig.password,
    database : dbConfig.database
});

let query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(error, connection) {
            if (error) {
                reject(error);
            } else {
                connection.query(sql, values, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                    connection.release();
                });
            }   
        });
    });
};

module.exports = query;