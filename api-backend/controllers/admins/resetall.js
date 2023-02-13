const sequelize = require('../../utils/database');
var initModels = require("../../models/init-models");
const { where } = require('sequelize');
//const chalk = require('chalk');
var models = initModels(sequelize);

exports.DeleteMatehodresetall = (req,res,next) => {
   
    let deleteall = new Promise((resolve,reject)  => {
        
        
        models.Polls.destroy({where:{}}).then ((d) => {
        
        models.users.destroy({where:{}}).then ((d) => {
        
        }).catch(err =>{
            console.log(err)
            resolve();
        })



        }).then(() =>{
            res.status(200).json({status:"okay"});
        })
        })


}