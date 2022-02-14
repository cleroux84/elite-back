module.exports = (sequelize, Sequelize) => {
    return sequelize.define('appointments', {
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        name: {
          type: Sequelize.VIRTUAL,
          get() {
              const firstName = this.getDataValue('firstName');
              const lastName = this.getDataValue('lastName')
              return [firstName, lastName].join(' ').trim();
          }
        },
        email: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        comment: {
            type: Sequelize.STRING
        },
        start: {
            type: Sequelize.DATE,
            get() {
                return this.getDataValue('start')
                    .toLocaleString('sv-SE', { timeZone: 'UTC'})
            }
        },
        end: {
            type: Sequelize.DATE,
            get() {
                return this.getDataValue('end')
                    .toLocaleString('sv-SE', { timeZone: 'UTC'})
            }
        }
    })
}