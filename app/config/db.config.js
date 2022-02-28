module.exports = {
    HOST: "us-cdbr-east-05.cleardb.net",
    USER: "b9581f613adf3c",
    PASSWORD: "b775d398",
    DB: "heroku_dbb3b36301fccda",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
};