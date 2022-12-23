const sequelize = require('../../utils/database');
var initModels = require("../../models/init-models");
//var models = initModels(sequelize);
exports.health = (req,res,next) =>{
    let heathpromise = new Promise((resolve,reject) =>{
        sequelize.authenticate().then(()=>{
            res.status(200).json({"status":"OK", "dbconnection":[]})
        }).catch(err =>  res.status(400).json({"status":"failed", "dbconnection":[]}) )
    })
    Promise.all([heathpromise]);
}