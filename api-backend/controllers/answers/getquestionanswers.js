// require models
const sequelize = require('../../utils/database');
var initModels = require("../../models/init-models");
const e = require('express');
const Questions = require('../../models/Questions');
var models = initModels(sequelize);
exports.getanswers  = (req,res,next)=>{

    const questionaireID = req.params.questionaireID ;
    const questionID = req.params.questionID;


    let pid,sid;
    let report_id;

    let statsa=[]; ///answer_id (vasi)
    let statstext=[];  ///answer text
    let statsaa=[]; ///answer_id (print)
    let statsr=[]; ///report_id
    let statss=[]; ///session_id
    let counter=0;


    if((!isNaN(questionaireID))&&(!isNaN(questionID))){

        pid = parseInt(questionaireID);
        qid = parseInt(questionID);
       // console.log(pid);
       // console.log(qid);

        let rsp = {};

        let found=false;
        let flag=0;

        let find_qid = new  Promise((resolve,reject)=>{
           
            models.Questions.findAll({where:{poll_id:pid},order:[['sequence','ASC']]}).then((q)=>{
               
                let length=q.length;

                if(length==0){
                    res.status(400).json({status:"failed",reason:`Poll with ID ${pid} does not exist`});
                    flag=1;
                }
                else{
                   
               
                    for(let i=0;i<length;i++){
                        let question=q[i].dataValues;

                        if(question.sequence==qid){
                            realqid=question.question_id;



                            rsp = {questionnaireID:`P${question.poll_id}`,qID:`Q${question.sequence}`,...rsp}
                           
                            found=true;


                        }
                    }
                }

               

               
                resolve();
                
               
            }).catch(err =>{
                console.log(err)
                resolve();
            })
        }) 

        Promise.all([find_qid]).then(() =>{
     

            if((found==false)&&(flag==0)){

                res.status(400).json({status:"failed",reason:`Question with ID ${qid} does not exist`});
            }
            else
            if(found==true){



                let find_reportforstats = new  Promise((resolve,reject)=>{

                    models.reportforstats.findAll({where:{question_id:realqid},order:[['report_id','ASC']]}).then((r)=>{

                        
                        for(let i=0;i<r.length;i++){
    
                            let rr=r[i].dataValues;

                            statsa=[rr.answer_id,...statsa];
                            statstext=["",...statstext];
                            statsaa=[0,...statsaa];
                            statsr=[rr.report_id,...statsr];
                            statss=["",...statss];
                            counter++;

                        }
                        statsr.reverse();
                        statsa.reverse();


                        resolve();
                    })

                })
            
            
                Promise.all([find_reportforstats]).then(() =>{

                    //console.log(statsr);
                    //console.log(statsa);
                    //console.log(statss);
                    let find_not_stats= new  Promise((resolve,reject)=>{

                        models.reportfornotstats.findAll({where:{question_id:realqid},order:[['report_id','ASC']]}).then((r)=>{
    
                            for(let i=0;i<r.length;i++){
    
                                let rr=r[i].dataValues;
    
                               
                                statsa=[-1,...statsa];
                                statstext=[rr.answer_text,...statstext];
                                statsaa=[0,...statsaa];
                                statsr=[rr.report_id,...statsr];
                                statss=["",...statss];
                                counter++;
    
                            }
    
                            statsr.reverse();
                            statsa.reverse();
                            statstext.reverse();
    
                            resolve();
    
    
                        })
    
    
    
    
                    })



                    Promise.all([find_not_stats]).then(() =>{
                    //console.log(statsr);
                    //console.log(statsa);
                    //console.log(statss);
                    //console.log(statstext);


                        ///find session ID
                        let cc=0;

                    let find_ss = new  Promise((resolve,reject)=>{
                        
                        let i=0;
                        if(counter==0){
                            resolve();
                        }
                        else
                        
                        while(i<counter){


                           // console.log("h");

                            let reportID=statsr[i];
  
                            //console.log(i);
                            //console.log(questionID);

                            let convertt = new  Promise((resolve,reject)=>{
                            models.report_answers.findByPk(reportID).then((r)=>{
                               


                                let report=r.dataValues;

                                for(let j=0;j<counter;j++){

                                    if(reportID==statsr[j]){
                                        statss[j]=report.session_id;
                                    }

                                }

                               // console.log(reportID);
                               // console.log(report.session_id);

                                
                                resolve();

                            })
                         })
                         Promise.all([convertt]).then(() =>{ 
                            cc++;
                            if(cc==counter)
                            resolve();

                         })

                         i++;
                            
                        }
                        
            
            
            
                    })


                    Promise.all([find_ss]).then(() =>{

                        let cc=0;

                        let find_aa = new  Promise((resolve,reject)=>{
                            
                            let i=0;
                            if(counter==0){
                                resolve();
                            }
                            else
                            
                            while(i<counter){
    
    
                               // console.log("h");
    
                                let answerID=statsa[i];
                              
                                //console.log(questionID);
    
                                let convertt = new  Promise((resolve,reject)=>{
                                models.answers.findAll({where:{answer_id:answerID},order:[['answer_id','ASC']]}).then((a)=>{
                                   
                                   
                                    if(a.length==0){
    
                                        resolve();
                                    }
                                    else{
    
                                    let answer=a[0].dataValues;
    
                                    for(let j=0;j<counter;j++){
    
                                        if(answerID==statsa[j]){
                                            statsaa[j]=answer.sequence;
                                            
                                           
                                            if(answer.atext!="<open string>"){
                                                statstext[j]=answer.atext;
                                            }
    
                                        }
    
                                    }
    
                                   // console.log(answerID);
                                    //console.log(answer.sequence);
                                     
    
                                    
                                    resolve();
                                }
    
                                })
                             })
                             Promise.all([convertt]).then(() =>{ 
                                cc++;
                                if(cc==counter)
                                resolve();
    
                             })
    
                             i++;
                                
                            }
                            
                
                
                
                        })

                        Promise.all([find_aa]).then(() =>{

                           // console.log(statsr);
                           // console.log(statsa);
                           // console.log(statss);
                           // console.log(statstext);
                            //console.log(statsaa);

                            for(let i=0;i<counter;i++){

                                for(let j=i+1;j<counter;j++){
    
                                    if(statss[i]>statss[j]){
    
                                        let a;
                                        a=statss[i];
                                        statss[i]=statss[j];
                                        statss[j]=a;
                                        
                                        a=statsaa[i];
                                        statsaa[i]=statsaa[j];
                                        statsaa[j]=a;
    
                                        a=statsa[i];
                                        statsa[i]=statsa[j];
                                        statsa[j]=a;
                                       
                                        a=statsr[i];
                                        statsr[i]=statsr[j];
                                        statsr[j]=a;
                                      
                                        a=statstext[i];
                                        statstext[i]=statstext[j];
                                        statstext[j]=a;
    
                                    }
    
                                }
                            }

                            let json =[];
                            for(let i=0;i<counter;i++){
                            if(statsaa[i]==0){
                                statsaa[i]="Text Answer";
                            }
                                json = [{
                                session:statss[i],
                                ansID:statsaa[i],
                                ans:statstext[i]
                               },...json]
    
                            }
                            json.reverse();
                            rsp.answers=json;


                            res.status(200).json({status:"okay",rsp});
                        })

                      
                    })


                    })

                })


            }

        })




    }
    else{

        res.status(400).json({status:"failed",reason:"Give Correct Input Format"});
    }
}

