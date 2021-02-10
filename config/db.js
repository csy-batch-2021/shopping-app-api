const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "65.1.119.59",
    port: 3306,
    user: "dharani",
    password: "Dharani@2021",
    database: "dharani_db",
    connectionLimit: 1
});

module.exports = pool;
