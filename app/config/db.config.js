const Process = require("process");
require('dotenv').config();
module.exports = {
    HOST: Process.env.HOST,
    USER: Process.env.USER,
    PASSWORD: Process.env.PASSWORD,
    DB: Process.env.DB,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
};