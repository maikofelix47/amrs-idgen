'use strict';

const config = require('../config/config');
const mysql = require('mysql');
var pool = mysql.createPool(config.database);

var def = {
    executeQuery: executeQuery
};

module.exports = def;

function executeQuery(query) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if(err) {
                connection.release();
                reject(err);
            }
            connection.query(query, (err, rows) => {
                if (!err) {
                    resolve(rows);
                }
                connection.release();
            });
        });
    });
}
