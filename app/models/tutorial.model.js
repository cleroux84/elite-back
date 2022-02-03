module.exports = (sequelize, Sequelize) => {
    return sequelize.define("articles", {
        title: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        },
        likeNumber: {
            type: Sequelize.INTEGER
        }
    });
};