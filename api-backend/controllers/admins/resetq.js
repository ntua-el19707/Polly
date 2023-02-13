
        // require models
        const sequelize = require('../../utils/database');
        var initModels = require("../../models/init-models");
        const { where } = require('sequelize');
        //const chalk = require('chalk');
        var models = initModels(sequelize);
        
        
       
        exports.DeleteMatehodresetq = (req,res,next) =>{
            let pid;
            let reportsid = [];
            let length;
            const questionnaireID = req.params.resetq_id ;
            if((!isNaN(questionnaireID))){
                pid = parseInt(questionnaireID);

            let findreport = new Promise((resolve,reject)  => {


                models.report_answers.findAll({where:{poll_id:pid}}).then((r)=>{
                     length = r.length;
    
                 for(let i = 0; i<length; i++){
                    
                    let report=r[i].dataValues;
                    reportsid[i] = report.report_id;      
                }
                    resolve();
                
                }).catch(err =>{
                    console.log(err)
                    resolve();
                })


          })
            
            Promise.all([findreport]).then((ra)=>{
                for(let i = 0; i < length; i ++){
                  models.reportforstats.destroy({where:{report_id:reportsid[i]}}).then((r)=>{

              })
                    
                   models.reportfornotstats.destroy({where:{report_id:reportsid[i]}}).then((r)=>{


              }).catch(err =>{
                console.log(err)
                resolve();
            })

            }   

            }).then(()=>{
                models.report_answers.destroy({where:{poll_id:pid}});

            }).then(() =>{

                res.status(200).json({status:"okay"});
            })

            }
            else{  

                res.status(400).json({status:"failed",reason:"Wrong Input"})
            }

            
            

        }
  
  
     
      
        