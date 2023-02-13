const sequelize = require('../../utils/database');
var initModels = require("../../models/init-models");
const { where } = require('sequelize');
//const chalk = require('chalk');
var models = initModels(sequelize);

exports.getstats  = (req,res,next)=>{

    console.log(req.params);

    const questionnaireID = req.params.questionnaireID ;

    if(!isNaN(questionnaireID)){
        pid = parseInt(questionnaireID);

        let rsp = {};

        let found=false;

        let statsq=[];
        let statsqtext=[];
        let statsqq=[];
        let statsanswers=[];
        let statsaa=[];
        let statsatext=[];

        let qsize=0;

        let find_questions = new  Promise((resolve,reject)=>{

            models.Questions.findAll({where:{poll_id:pid},order:[['sequence','ASC']]}).then((q)=>{

                if(q.length==0){

                    res.status(400).json({status:"failed",reason:`Poll with ID ${pid} does not exist`});
                }
                else{

                    found=true;
                    
                    for(let i=0;i<q.length;i++){

                        let questions=q[i].dataValues;

                        statsq=[questions.question_id,...statsq]
                        statsqtext=[questions.qtext,...statsqtext]
                        statsqq=[questions.sequence,...statsqq]
                        statsanswers=[null,...statsanswers]
                        qsize++;

                    }
                    statsq.reverse();
                    statsqtext.reverse();
                    statsqq.reverse();
                    


                }

                resolve();

            })



        })

        Promise.all([find_questions]).then(() =>{

           console.log(statsq);
            //console.log(statsqq);
            //console.log(statsqtext);
            //console.log(qsize)

            
            if(found==true){

                /*
                let cc=0;

                let find_answers = new  Promise((resolve,reject)=>{
                    
                    let i=0;
                    if(qsize==0){
                        resolve();
                    }
                    else
                    
                    while(i<qsize){


                       // console.log("h");

                        let qid=statsq[i];
                        //console.log(qid);

                        //console.log(i);
                        //console.log(questionID);

                        let convertt = new  Promise((resolve,reject)=>{
                            models.reportforstats.findAll({where:{question_id:qid},order:[['answer_id','ASC']]}).then((r)=>{
                           
                            console.log(qid,r.length);

                            let json=[];

                                
                             for(let j=0;j<r.length;j++){

                                let answer=r[j].dataValues;
                                console.log(answer.answer_id);
                                

                             }
                             resolve();

                         }

                                

                           // console.log(reportID);
                           // console.log(report.session_id);

                            
                            

                        })
                     })
                     Promise.all([convertt]).then(() =>{ 
                        cc++;
                        if(cc==qsize)
                        resolve();

                     })

                     i++;
                        
                    }
                    
        
        
        
                })
                */
                let cc=0;

                let find_answers = new  Promise((resolve,reject)=>{
                    
                    let i=0;
                    if(qsize==0){
                        resolve();
                    }
                    else
                    
                    while(i<qsize){


                       // console.log("h");

                        let qid=statsq[i];
                        //console.log(qid);

                        //console.log(i);
                        //console.log(questionID);

                        let convertt = new  Promise((resolve,reject)=>{
                            models.answers.findAll({where:{question_id:qid},order:[['sequence','ASC']]}).then((a)=>{
                           
                           // console.log(qid,a.length);

                            let json=[];

                                
                             for(let j=0;j<a.length;j++){

                                let answer=a[j].dataValues;
                               // console.log("in");

                               let freq=0;
                                json=[{

                                    ansID:answer.answer_id,
                                    anssequence:answer.sequence,
                                    anstext:answer.atext,
                                    ansfreq:freq,
                                    anspossible:freq

                                },...json]
                                
                                

                             }
                             //console.log(json);

                             for(let k=0;k<qsize;k++){
                                
                                
                                if(qid==statsq[k]){

                                   
                                    json.reverse();

                                    statsanswers[k]=json;
                                    console.log(json);
                                }
                             }

                             resolve();

                         

                                

                           // console.log(reportID);
                           // console.log(report.session_id);

                            
                            

                        })
                     })
                     Promise.all([convertt]).then(() =>{ 
                        cc++;
                        if(cc==qsize)
                        resolve();

                     })

                     i++;
                        
                    }
                    
        
        
        
                })

                

                Promise.all([find_answers]).then(() =>{

                    //console.log(statsq);
                    //console.log(statsanswers);

                    let cc=0;

                let find_freq = new  Promise((resolve,reject)=>{
                    
                    let i=0;
                    if(qsize==0){
                        resolve();
                    }
                    else
                    
                    while(i<qsize){



                        let qid=statsq[i];
                    

                        let convertt = new  Promise((resolve,reject)=>{
                            models.reportforstats.findAll({where:{question_id:qid},order:[['answer_id','ASC']]}).then((r)=>{
                           
                           // console.log(qid,a.length);

                            let json=[];

                                
                             for(let j=0;j<r.length;j++){

                                let answer=r[j].dataValues;
                                
                                for(let k=0;k<qsize;k++){
                                    
                                    if(qid==statsq[k]){

                                        statsanswers[k].forEach(element => {
                                            if(element.ansID==answer.answer_id){
                                                element.ansfreq++;
                                            }
                                            element.anspossible++;
                                        });


                                    }
                                }

                               
                                
                                

                             }
                             //console.log(json);

                            
                             resolve();

                         

                                

                           // console.log(reportID);
                           // console.log(report.session_id);

                            
                            

                        })
                     })
                     Promise.all([convertt]).then(() =>{ 
                        cc++;
                        if(cc==qsize)
                        resolve();

                     })

                     i++;
                        
                    }
                    
        
        
        
                })

                Promise.all([find_freq]).then(() =>{
                    console.log(statsanswers);


                    let json=[];


                    for(let i=0;i<qsize;i++){

                        let flag=0;
                        let ansjson=[];
                        statsanswers[i].forEach(element => {
                            if(element.anspossible>0){
                                flag=1;

                                let per=(element.ansfreq/element.anspossible) *100
                                ansjson=[{

                                    aid:element.anssequence,
                                    atext:element.anstext,
                                    percentage:per

                                },...ansjson]

                            }
                        });

                        if(flag==1){
                            ansjson.reverse();

                            json=[{

                                qID:statsqq[i],
                                qtext:statsqtext[i],
                                stats:ansjson



                            },...json]


                        }



                    }
                    json.reverse();

                    console.log(json);
                    let rsp=[];
                    rsp={questions:json}

                

                    res.status(200).json({status:"okay",rsp});

                })

                })



            }
            
            //res.status(200).json({status:"okay",statsq});
        })




    }
    else{
        res.status(400).json({status:"failed",reason:"You gave string instead of number"});
    }



   

}