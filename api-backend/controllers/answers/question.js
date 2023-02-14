// require models
const sequelize = require('../../utils/database');

var initModels = require("../../models/init-models");
const e = require('express');
const Questions = require('../../models/Questions');
var models = initModels(sequelize);


const JSONToCSV = (objArray, keys) => {
    let csv = keys.join(',');
    objArray.forEach((row) => {
        let values = [];
        keys.forEach((key) => {
            console.log(key)
            key.forEach(k=>{
            values.push(row[k]|| '');})
           // console.log(row);
        });
        csv += '\n' + values.join(',');
    });
    return csv;
};


exports.question  = (req,res,next)=>{
    
    const questionaireID = req.params.questionaireID ;
    const questionID = req.params.questionID;
    const format = req.query.format; 

    let pid,qid;
    let flag=1;
    let realqid;

    if((!isNaN(questionaireID)) && (!isNaN(questionID)) && (format === "csv" || format === "json" || format === undefined) ){
        pid = parseInt(questionaireID);
        qid = parseInt(questionID);

        /// pid = pollID , qid = QuestionID , pid & qid = numbers

        let rsp = {};

        let found=true;
        
        let fetchquestion = new  Promise((resolve,reject)=>{
           
            models.Questions.findAll({where:{poll_id:pid},order:[['sequence','ASC']]}).then((q)=>{
               
                let length=q.length;

                if(length==0){
                    res.status(400).json({status:"failed",reason:`Poll with ID ${pid} does not exist`});
                    flag=0;
                }
                else{
                    found=false;
               
                    for(let i=0;i<length;i++){
                        let question=q[i].dataValues;

                        if(question.sequence==qid){
                            realqid=question.question_id;


                            let req;
                            if(question.required==1){
                                req='true';
                            }
                            else
                            req='false';

                            rsp = {questionnaireID:`P${question.poll_id}`,qID:`Q${question.sequence}`,qtext:question.qtext, required:req, type:question.qtype,...rsp}
                           
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

      
        Promise.all([fetchquestion]).then(() =>{ 
            
            
            if(found==false){
                res.status(402).json({status:"failed",reason:`Question with ID ${qid} does not exist`});
                flag=0;
            }
            else
          
            if(flag==1){

                let nextqid=[];
                //console.log(realqid);

                let fetchanswer = new  Promise((resolve,reject)=>{

                    let counter=0;

                    models.answers.findAll({where:{question_id:realqid},order:[['sequence','ASC']]}).then((a)=>{

    
                        for(let i=0;i<a.length;i++){
                            let answers=a[i].dataValues;

                            models.Questions.findByPk(answers.depented_qid).then((q)=>{

                                let qq=q.dataValues;
                                nextqid=[qq.sequence,...nextqid];
                                counter++;

                                if(counter==a.length){
                                    nextqid.reverse();
                                    //console.log(nextqid);
                                    resolve();
                                }

                            })

                        }
                        
                    })

                })

                Promise.all([fetchanswer]).then(() =>{

                    let fetchresults = new  Promise((resolve,reject)=>{

                        models.answers.findAll({where:{question_id:realqid},order:[['sequence','ASC']]}).then((a)=>{

                    
                            let json =  [] ;

                            for(let i=0;i<a.length;i++){

                                let answer=a[i].dataValues;
                            
                                json = [{
                                    optID:`Q${qid}A${answer.sequence}`,
                                    opttext:answer.atext ,
                                    nextqID:`Q${nextqid[i]}`
                                },...json]

                            }
                            json.reverse();
                   
                            rsp.options = json ;

                            resolve();
                            
                        })

                    })


                    
                    Promise.all([fetchresults]).then(() =>{
                       

                        if(format === 'csv'){

                            var question_Arr = [];
                            let keys = [];

                            rsp.options.forEach(option  => {
                                row = {
                                    questionaireID: rsp.questionnaireID,
                                    qID: rsp.qID,
                                    qtext: rsp.qtext,
                                    type: rsp.type,
                                    optID:option.optID,
                                    opttext:option.opttext,
                                    nextqID:option.nextqID,
                                    ...option
                                }
                                //console.log(row);
                                question_Arr.push(row);
                                //console.log(question_Arr);
                            })
                            
                            keys.push(Object.keys(question_Arr[0]));
                            //console.log(JSONToCSV(question_Arr,keys));
                            rsp = (JSONToCSV(question_Arr,keys));

                        }
                            res.status(200).json({status:"okay",rsp});
                        })  

                })


            }
           
        })

        

    }
    else{
        res.status(400).json({status:"failed",reason:"Wrong parameters format"})
     }

    }
 