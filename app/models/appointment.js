module.exports = (sequelize, Sequelize) => {
    return sequelize.define('appointments', {
        firstname: {
            type: Sequelize.STRING
        },
        lastname: {
            type: Sequelize.STRING
        },
        name: {
          type: Sequelize.VIRTUAL,
          get() {
              const firstname = this.getDataValue('firstname');
              const lastname = this.getDataValue('lastname')
              return [firstname, lastname].join(' ').trim();
          }
        },
        // status: {
        //   type: Sequelize.BOOLEAN
        // },
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