// require models
const sequelize = require('./database');
var initModels = require("../models/init-models");
const { vaildPass } = require('./StringGen');
var models = initModels(sequelize);

function auth(user,pass) {
    return new Promise((resolve,reject)=>{
        models.users.findOne({where:{email:user}}).then((userF)=>{
            critentials  = userF.dataValues ;
            console.log('pass')
            if(vaildPass(pass,critentials.saltpw,critentials.hashpw)){
                resolve(true)
            }else{
               // console.log('pass do not match')
                resolve(false);
            }
          }).catch(err=>{
          // console.log(err)
          reject(err)
          })
    })
} 
module.exports ={auth}