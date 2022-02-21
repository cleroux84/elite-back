module.exports = {
    HOST: "us-cdbr-east-05.cleardb.net",
    USER: "b9581f613adf3c",
    PASSWORD: "b775d398",
    DB: "heroku_dbb3b36301fcc",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
};
/*
module.exports = {
    HOST: "127.0.0.1",
    USER: "root",
    PASSWORD: "Sasha",
    DB: "elite42",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
};*/
