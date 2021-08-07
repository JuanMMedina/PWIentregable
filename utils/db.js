const mysql = require('mysql');
const util = require('util');

let pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
})

pool.query = util.promisify(pool.query);
module.exports = pool;