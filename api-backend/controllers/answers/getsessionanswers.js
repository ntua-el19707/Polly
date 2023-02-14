// require models
const sequelize = require('../../utils/database');
var initModels = require("../../models/init-models");
const e = require('express');
const Questions = require('../../models/Questions');
var models = initModels(sequelize);
exports.getanswers  = (req,res,next)=>{

    const questionaireID = req.params.questionaireID ;
    const session = req.params.session;

    let pid,sid;
    let report_id;

    let statsq=[];
    let statsa=[];
    let statstext=[];
    let statsqq=[];
    let statsaa=[];
    let counter=0;

    if((!isNaN(questionaireID))&&(session.length==4)){

        pid = parseInt(questionaireID);
        sid = session;


        let rsp = {};
        let found=false;

        let find_poll = new  Promise((resolve,reject)=>{

            models.report_answers.findAll({where:{poll_id:pid,session_id:sid},order:[['poll_id','ASC']]}).then((p)=>{

                if(p.length==0){

                    res.status(400).json({status:"failed",reason:`Poll with ID ${pid} and Session ${sid} does not exist`});
                }
                else{

                    found=true;
                    let report=p[0].dataValues;

                    report_id= report.report_id;
                    console.log(report_id);

                    rsp = {questionnaireID:`P${report.poll_id}`,session:report.session_id,...rsp};


                }

                resolve();

            })



        })

        Promise.all([find_poll]).then(() =>{ 

            if(found==true){

                let find_answer_stats= new  Promise((resolve,reject)=>{

                    models.reportforstats.findAll({where:{report_id:report_id},order:[['question_id','ASC']]}).then((r)=>{

                        for(let i=0;i<r.length;i++){

                            let rr=r[i].dataValues;

                            statsq=[rr.question_id,...statsq];
                            statsa=[rr.answer_id,...statsa];
                            statstext=["",...statstext];
                            statsqq=[0,...statsqq];
                            statsaa=[0,...statsaa];
                            counter++;

                        }

                        statsq.reverse();
                        statsa.reverse();

                        resolve();


                    })




                })
            
                
            
                Promise.all([find_answer_stats]).then(() =>{ 

                    let find_not_stats= new  Promise((resolve,reject)=>{

                        models.reportfornotstats.findAll({where:{report_id:report_id},order:[['question_id','ASC']]}).then((r)=>{
    
                            for(let i=0;i<r.length;i++){
    
                                let rr=r[i].dataValues;
    
                                statsq=[rr.question_id,...statsq];
                                statsa=[-1,...statsa];
                                statstext=[rr.answer_text,...statstext];
                                statsqq=[0,...statsqq];
                                statsaa=[0,...statsaa];
                                counter++;
    
                            }
    
                            statsq.reverse();
                            statsa.reverse();
                            statstext.reverse();
    
                            resolve();
    
    
                        })
    
    
    
    
                    })
            
                
                


                Promise.all([find_not_stats]).then(() =>{ 
                    console.log(statsq);
                    console.log(statsa);

                    let cc=0;

                    let find_qq = new  Promise((resolve,reject)=>{
                        
                        let i=0;
                        if(counter==0){
                            resolve();
                        }
                        else
                        
                        while(i<counter){


                           // console.log("h");

                            let questionID=statsq[i];
                           // console.log(i);
                            //console.log(questionID);

                            let convertt = new  Promise((resolve,reject)=>{
                            models.Questions.findByPk(questionID).then((q)=>{
                               


                                let question=q.dataValues;

                                for(let j=0;j<counter;j++){

                                    if(questionID==statsq[j]){
                                        statsqq[j]=question.sequence;
                                    }

                                }

                                //console.log(questionID);
                               // console.log(question.sequence);

                                
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
                    Promise.all([find_qq]).then(() =>{ 


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
                    
                        /*
                        console.log(statsq);
                        console.log(statsa);
                        console.log(statsqq);
                        console.log(statsaa);
                        console.log(statstext);
                        */
                        

                        for(let i=0;i<counter;i++){

                            for(let j=i+1;j<counter;j++){

                                if(statsqq[i]>statsqq[j]){

                                    let a;
                                    a=statsqq[i];
                                    statsqq[i]=statsqq[j];
                                    statsqq[j]=a;
                                    
                                    a=statsaa[i];
                                    statsaa[i]=statsaa[j];
                                    statsaa[j]=a;

                                    a=statsa[i];
                                    statsa[i]=statsa[j];
                                    statsa[j]=a;
                                   
                                    a=statsq[i];
                                    statsq[i]=statsq[j];
                                    statsq[j]=a;
                                  
                                    a=statstext[i];
                                    statstext[i]=statstext[j];
                                    statstext[j]=a;

                                }

                            }
                        }
                        /*
                        console.log(statsq);
                        console.log(statsa);
                        console.log(statsqq);
                        console.log(statsaa);
                        console.log(statstext);
                        */
                        

                        let json =[];
                        for(let i=0;i<counter;i++){
                        if(statsaa[i]==0){
                            statsaa[i]="Text Answer";
                        }
                            json = [{
                            qID:`Q${statsqq[i]}`,
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

//let json = [] ;

//json = [...json,{pr:1,pr2:2}]
//json.forEach(o=>{
//    o.pr
//    o.kainot = 
//})