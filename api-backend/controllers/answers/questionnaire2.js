// require models
const sequelize = require('../../utils/database');
var initModels = require("../../models/init-models");
const e = require('express');
const Questions = require('../../models/Questions');
var models = initModels(sequelize);
exports.questionnaire  = (req,res,next)=>{


    const questionaireID = req.params.questionnaireID ;
    console.log(questionaireID);

    let pid;

    if(!isNaN(questionaireID)){

        pid = parseInt(questionaireID);

        let rsp = {};

  
        let found=false;


        let find_poll = new  Promise((resolve,reject)=>{
           
            models.Polls.findAll({where:{poll_id:pid},order:[['poll_id','ASC']]}).then((p)=>{
               
                let length=p.length;

                if(length==0){
                    res.status(400).json({status:"failed",reason:`Poll with ID ${pid} does not exist`});
  
                }
                else{
  
                   let poll=p[0].dataValues;
                   found=true;

                   rsp = {questionnaireID:`P${poll.poll_id}`,questionnaireTitle:poll.title,...rsp}

                }

               

               
                resolve();
                
               
            }).catch(err =>{
                console.log(err)
                resolve();
            })
        }) 

        Promise.all([find_poll]).then(() =>{

            if(found==true){

                let find_keywords = new  Promise((resolve,reject)=>{

                    models.keywords.findAll({where:{poll_id:pid},order:[['keyword','ASC']]}).then((k)=>{
                    
                    let keyw=[];

                    for(let i=0;i<k.length;i++){

                        let words=k[i].dataValues;

                        keyw=[words.keyword,...keyw];

                    }
                    
                    keyw.reverse();
                    rsp.keywords=keyw;
                    resolve();

                    })




                })

                Promise.all([find_keywords]).then(() =>{

                    let find_questions = new  Promise((resolve,reject)=>{

                        models.Questions.findAll({where:{poll_id:pid},order:[['sequence','ASC']]}).then((q)=>{

                            let json=[];

                            for(let i=0;i<q.length;i++){

                                let question=q[i].dataValues;

                                let req;
                                if(question.required==1){
                                    req="true";
                                }
                                else
                                req="false";


                                json = [{
                                    qID:`Q${question.sequence}`,
                                    qtext:question.qtext ,
                                    required:req ,
                                    type:question.type
                                },...json]



                            }

                            json.reverse();
                            rsp.questions=json;
                            resolve();


                        })

                    })

                    
                    Promise.all([find_questions]).then(() =>{

                        res.status(200).json({status:"okay",rsp});
                    })


                })







            }
        })




    }
    else{
        res.status(400).json({status:"failed",reason:"You gave string instead of number"})
     }
   

}
