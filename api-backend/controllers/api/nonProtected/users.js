// require models
const sequelize = require('../../../utils/database');
var initModels = require("../../../models/init-models");
var models = initModels(sequelize);

const {genpass,vaildPass,issueJWT} = require('../../../utils/StringGen')



exports.register = async(req,res,next) => {
    const email = req.body.user ;
    console.log(req.body)
    if(req.body.pass === req.body.pass2 && email ){
        const pass = genpass(req.body.pass);
          user  =  await models.users.create({email:email,previlages:'user',hashpw:pass.hash,saltpw:pass.salt}).then((user)=>{
            res.json({user:user.dataValues});
            
        }).catch(err =>{
            res.status(400).json({msg:err,status:'ERROR'});
        })
      //  res.status(200).json({user:user})

       
    }
   else{ res.status(400).json({msg:'Not right critentials',status:'ERROR'});}


}
exports.login = (req,res,next) =>{
    let user = req.body.login;
    console.log(user)
    let critentials ;
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
      }}})

      

}
exports.deleteuser = async (req,res,next)=>{
    const id =req.params.id
    const user =await  models.users.destroy({where:{
        email:id
    }
    }).then((user)=>{
        res.status(200).json({msg:`delete ${user} users`,status:'OK'})

    }).catch(err=>{
        res.status(400).json({err:err})
    })

}