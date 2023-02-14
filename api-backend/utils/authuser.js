// require models
const sequelize = require('./database');
var initModels = require("../models/init-models");
const { vaildPass } = require('./StringGen');
var models = initModels(sequelize);


function auth(user,pass) {
    return new Promise((resolve,reject)=>{
        models.users.findOne({where:{email:user}}).then((userF)=>{
            critentials  = userF.dataValues ;
           // console.log('pass')
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
function ChangeUser(fullName,User,UserPK){
    return new Promise((resolve,reject)=>{
        console.log(fullName)
        models.users.update({full_name:fullName,email:User},{where:{
            email:UserPK
        }}).then(()=>{
            resolve(true)
        }).catch(err=>{
            reject(err)
        })
    })
}
function getMyInfo(user){
    return new Promise((resolve,reject)=>{
    models.users.findByPk(user).then((userRsp)=>{
        let full_name = userRsp.dataValues.full_name
        if(!full_name){
full_name ='';
        }
        const rsp = {
            fullName:full_name,
            user:userRsp.dataValues.email
        }
        resolve(rsp)
    }).catch(err=>{
        reject(err)
    })})
}
function MypollsCount(user){
    return new Promise((resolve,reject)=>{
        models.Polls.findAndCountAll({
            where: {
              email:user
            }
          }).then((polls)=>{

            resolve(polls.count)
          }).catch(err=>{
            console.log(err);
            reject(err)
          })
    })
}
module.exports ={auth,ChangeUser,MypollsCount,getMyInfo}