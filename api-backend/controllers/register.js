const sequelize = require('../utils/database');
var initModels = require("../models/init-models");
var models = initModels(sequelize);

const {genpass} = require('../utils/StringGen')
exports.register =(req,res,next) => {
    let mode  = req.body.mode ;
    //to do update user ;
    if(mode === 'Change_pass'){
        //To do change pass 
        let ChangePassPromise = new Promise((resolve,reject)=>{
            let email = req.body.login.user;//this for sure exist middleware check it
            
            let newpass1 = req.body.register.pass1 ;
            let newpass2 = req.body.register.pass2 ;
            if(newpass1 && newpass2){
                if(newpass1 === newpass2){
                    //all "ok" 
                    let critentials = genpass(newpass1); //password created ;
                    let user = models.users.update({hasdpw:critentials.hash,passpw:critentials.salt},{
                        where: {
                          email: email
                        }}).then((user) =>{
                            res.status(200).json({user:user.dataValues,status:"ok"});
                            resolve();}
                        ).catch(err=>{
                            res.status(400).json({msg:err,status:"error"});//search specific erros ; and implement catch 
                            resolve();
                        })
                   
                }
                else{
                    //paswords do not match wrong 
                    res.status(400).json({msg:"Pass1 && Pass2 do not match ",status:"error"});
                    resolve();
                }

            }else{
                //wrong format  error 
                res.status(400).json({msg:"User have not given new password",status:error});
                resolve();
            }

        })
        Promise.all([ChangePassPromise]).then();
      
    }
    else{
        //to do register a new  user
        let RegisterUserPromise = new  Promise((resolve,reject)=>{
            let email = req.body.register.user;//this for sure exist middleware check it
            
            let newpass1 = req.body.register.pass1 ;
            let newpass2 = req.body.register.pass2 ;
            if(newpass1 && newpass2){
                if(newpass1 === newpass2){
                    //all ""ok"" 
                    let pass = genpass(newpass1); //password created ;
                    let user = models.users.create({email:email,hashpw:pass.hash,saltpw:pass.salt}).then(
                        (user)=>{
                            res.status(200).json({user:user.dataValues,status:"ok"});
                            resolve();
                        }
                    ).catch(err =>{
                        res.status(400).json({msg:err,status:"error"});//search specific erros ; and implement catch 
                        resolve();
                    })
                    
                }
                else{
                    //paswords do not match wrong 
                    res.status(400).json({msg:"Pass1 && Pass2 do not match ",status:error});
                    resolve();
                }

            }else{
                //wrong format  error 
                res.status(400).json({msg:"User have not given new password",status:error});
                resolve();
            }
           
        })
        Promise.all([RegisterUserPromise]).then();
        
    }
    }