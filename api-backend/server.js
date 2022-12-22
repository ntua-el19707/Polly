// sudo sequelize-auto -h localhost -d data_base_name -u sql_username -x sql_password -p 3306 --dialect mysql


const app = require('./app');//api module  Backend routes controllers code  
require('custom-env').env('localhost'); 
const port = process.env.server_port

// for database
const sequelize = require("./utils/database");
var initModels = require("./models/init-models");

initModels(sequelize);
sequelize
.sync({
    // delete if system is ready to deploy
   // force: true,
    // end
})
.then((result) => {
    app.listen(port, () => {
        console.log(` Server running on port ${port}!`);
    });
})
.catch((err) => console.log(err));
