module.exports = (sequelize, Sequelize) => {
    return sequelize.define('admins', {
        email: Sequelize.STRING
    })
}