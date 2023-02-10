const sequelize = require('../../utils/database');
const  initModels = require("../../models/init-models");
const { router } = require('../../app');
const models = initModels(sequelize);

exports.getmypolls = (req,res,next) =>{
    const email  = req.jwt.sub ; 
    let resp ={} ; 
    if(email){
    let fetchmypolls  = new Promise((resolve,reject) =>{
        models.Polls.findAll({where:{
            email:email
        }}).then((row) =>{
           // console.log(row)

           /*QuestionarieTitle:,id:0 */
            let polls = [] ;
            row.forEach(r => {
                polls = [...polls,{QuestionarieTitle:r.dataValues.title,id:r.dataValues.poll_id}]
            });
            //console.log(polls);
            resp = {polls:polls};
           //res.status(200).json({Poll:row})
            resolve(resp);

        }).catch(err=>{
            console.log(err)
            resp ={err:err}
            resolve(resp);
        })
       
    
    })
    Promise.all([fetchmypolls]).then((resp)=>{
        if(resp.err){
            res.status(400).json(resp)
        }else{
            res.status(200).json(resp)
        }
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