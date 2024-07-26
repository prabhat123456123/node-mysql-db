const Sequelize = require('sequelize')
const { password,database,user,host } = require('./index')

// console.log( process.env.password,process.env.database,process.env.user,process.env.host);
const sequelize = new Sequelize(
    database,
    user,
    password,
    {
       dialectOptions: {
      multipleStatements: true,
    },
    dialect: "mysql",
        host,
        define: {
            freezeTableName:true
        },
        logging:false
    },
    {
        pool: {
            min: 0,
            max: 5,
            acquire: 3000,
            idle:1000
        }
       
    }
)

module.exports = {
    sequelize
}