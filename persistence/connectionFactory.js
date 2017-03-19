/**
 * Created by mathias on 28/02/17.
 */

var mysql = require('mysql');

function createDbConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '4n0ny2015',
        database: 'payfast'
    });
}

module.exports = function () {
    return createDbConnection;
};

/*
Perceba que nesse código eu estou retornando uma funcao.
 */