// require models
const sequelize = require('../utils/database');
var initModels = require("../models/init-models");
var models = initModels(sequelize);

const {vaildPass,issueJWT} = require('../utils/StringGen')
exports.login = (req,res,next) =>{
    let user = req.body.Login;

    //console.log(req.body)
    let critentials ;
    if(user){
    let fetchUser = new Promise ((resolve,reject)=>{
     models.users.findOne({where:{email:user.user}}).then((user)=>{
        critentials  = user.dataValues ;
        resolve();
      }).catch(err=>{
        res.status(401).json({err:err,status:"error"})
        resolve()
      })})
      Promise.all([fetchUser]).then(()=>{
        if(critentials){
      if(vaildPass(user.pass,critentials.saltpw,critentials.hashpw)){
          const jwt = issueJWT(critentials)
          res.status(200).json({user:jwt,status:"ok"})
      }else{
          res.status(401).json({msg:"Access denied",status:"Wrong pass"})
      }}})}
      else{
        res.status(400).json({msd:"No  provide for Login",status:"error"})
      }
}
