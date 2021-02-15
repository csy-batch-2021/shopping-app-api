const mysql = require("mysql2/promise");

console.log('database host:', process.env.DB_HOST);
console.log('database port:', process.env.DB_PORT);
console.log('database user:', process.env.DB_USER);
console.log('database pass:', process.env.DB_PASSWORD);
console.log('database name:', process.env.DB_NAME);
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 1
});

module.exports = pool;
