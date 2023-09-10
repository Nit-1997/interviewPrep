require('dotenv').config();

const config = {
    dbUser: process.env.DB_USER,
    dbPwd: process.env.PASSWORD,
    dbName: process.env.DB_NAME
}

module.exports = config;