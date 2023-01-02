const sequelize = require('../../utils/database');
const  initModels = require("../../models/init-models");
const { router } = require('../../app');
const models = initModels(sequelize);

exports.getmypolls = (req,res,next) =>{
    const email  = req.body.Creator ; 
    if(email){
    let fetchmypolls  = new Promise((resolve,reject) =>{
        models.Polls.findAll({where:{
            email:email
        }}).then((row) =>{
           res.status(200).json({Poll:row})
            resolve();

        }).catch(err=>{
            console.log(err)
            resolve();
        })
       
    })
    Promise.all([fetchmypolls]).then(()=>{
        res.send('hi')
    })
}
    else{
        res.status(400).json({msg:"You have no set a Creator"})
    }
}
exports.deleteMypoll = (req,res,next) =>{
    const id  = req.params.id ; 
    let deleteMypoll = new Promise((resolve,reject) =>{
        models.Polls.destroy({where:{
            poll_id:id
        }}).then(() =>{
            resolve();
        }).catch(err =>{
            console.log(err);
            resolve();
        })
    })
    Promise.all([deleteMypoll]).then(()=>{
        res.status(200).json({msg:'ok'})
    })
}