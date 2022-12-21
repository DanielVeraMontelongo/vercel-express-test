const mysql = require("mysql2")

const connection = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "Hh_659654276",
    database: process.env.DB_NAME || "appbooks",
    port: process.env.DB_PORT || 3306
})

connection.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Conexión correcta");
    }
})

module.exports = connection;