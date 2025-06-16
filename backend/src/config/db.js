// Config with Database connnection intergration 
const mysql = require("mysql2/promise");
const db = mysql.createPool({
    host: "localhost",
    user: "root", 
    password: "",
    database: "development",
    port: 3306, 
    namedPlaceholders: true 
})

module.exports = {db};


