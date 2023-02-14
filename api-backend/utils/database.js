const Sequelize = require('sequelize')
require('custom-env').env('localhost')
console.log('custom-env');
sequelize = new Sequelize(process.env.DB_Database, process.env.DB_user, process.env.DB_password, {
    dialect: 'mysql',
    host: process.env.DB_host,
    port: process.env.DB_port,
}); 

sequelize.authenticate()
.then(() => {
    console.log("Success connecting to database!");    
})
.catch(err => {
    console.error("Unable to connect to the database", err);
})

module.exports = sequelize;