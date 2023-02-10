// require models
const sequelize = require('../../utils/database');
var initModels = require("../../models/init-models");
const e = require('express');
const Questions = require('../../models/Questions');
const chalk = require('chalk');
var models = initModels(sequelize);

async function getSequence(id){
    //const params = id;  
    let error =true; 
    let msg ="";
    let rsp;

       
      await  models.Questions.findByPk(id).then((q)=>{
             rsp = 'Q'+q.dataValues.sequence ;
            return rsp;
        }).catch(err=>{
            error =false;
            msg = err;
            return msg;
            
        })

   
}
function sortByProperty(property){  
    return function(a,b){  
       if(a[property] > b[property])  
          return 1;  
       else if(a[property] < b[property])  
          return -1;  
   
       return 0;  
    }  
 }
/*
find firts   let fetchfirst = new Promise((resolve,reject )=>{
                    sequelize.query(`select q.question_id from Questions as q  where q.poll_id =${pid}  EXCEPT (select distinct a.dquestion_id from answers as a join Questions as q on q.question_id = a.question_id where q.poll_id =${pid})`).then((row)=>{
                     first = row[0][0].question_id;
                        resolve();
                    }).catch(err=>
                        {
                            console.log(err)
                            resolve();
                        })
                })*/

exports.getQuestionarie = (req,res,next) =>{
    let rsp;
    const poll_id = parseInt(req.params.id );
    let fetchpoll = new  Promise((resolve,reject)=>{
        models.Polls.findByPk(poll_id).then((poll)=>{
            let p = poll.dataValues;
            rsp = {questionnaireID:`QQ${p.poll_id}`,questionnaireTitle:poll.title,creator:p.email,apid:poll_id,keywords:[],...rsp}
            resolve();
        }).catch(err =>{
            console.log(err)
            resolve();
        })
    }).then(()=>{ 
    
    getQuestions(poll_id).then((questions) =>{
        console.log(questions)
        getQuestionsOptions(questions).then((questions)=>{
        rsp.questions = questions;
    res.status(200).json(rsp)
        })
    })})

}
function builOption(options){
    return new Promise((resolve,reject)=>{
        let nextqID = '-'
        models.Questions.findByPk(options.depented_qid).then((q)=>{
            if(q){                         
            nextqID = 'Q'+q.dataValues.sequence ;
            }
          
            resolve(nextqID)
      
       }).catch(err=>{
      console.log(err)
      
         resolve(nextqID)
           
       })
    })
}
function buildOptions(options,qiD){
    return new Promise((resolve,reject)=>{
    const size= options.length ; 
    let counter =0 ; 
    let optionsnew = [];
   // console.log(options)
   if(options.length === 0){
    resolve([])
   }
    options.forEach(o=>{
        builOption(o).then((nextqID)=>{
            //console.log(options);
            optionsnew = [{
                optID:`${qiD}A${o.sequence}`,
                opttxt:o.atext ,
                dpented:o.depented_qid,
                nextqID:nextqID,
                actual:o.answer_id
               },...optionsnew]
               ++counter;
               if(size === counter){
                console.log(optionsnew)
                resolve(optionsnew)

               }
        })
    })
})
}
function getqOptions(quetion){
    return new Promise((resolve,reject)=>{
        //console.log(quetion)
        models.answers.findAll({where:{question_id:quetion.actualid},order:[['sequence','ASC']]}).then((a)=>{
                                let options =[] ;
            for(let i =0;i<a.length;i++){
                options = [...options,a[i].dataValues]
            }

         //  console.log(options);
           // resolve()
         
            buildOptions(options,quetion.qID).then((optionsn)=>{  
                 options = optionsn
                 options.sort(sortByProperty('optID'));
                 //console.log(options)
                resolve(options);})
          
           //resolve()
         

        }).catch(err=>{
            console.log(err)
            resolve()
        })
    })
}
function getQuestions(poll_id){

    return new Promise((resolve,reject)=>{
         
            models.Questions.findAll({where:{poll_id:poll_id},order:[['sequence','ASC']]}).then(
                (q)=>{
                    let json =  [] ;   
                       for(let i = 0 ; i<q.length;i++){
                       let el = q[i].dataValues;
                      // console.log(el)
                       json = [...json,{
                        qID:`Q${el.sequence}`,
                        qtext:el.qtext ,
                        type:el.qtype,
                        required:el.required === 1 ? "TRUE":"FALSE",
                        actualid:el.question_id,
                    //    actual_id:el.question_id
                       }]
                    }
                    
                    resolve(json);
                }
            ).catch(err=>{
                console.log(err)
                resolve();
            })
      
    })
}
function getQuestionsOptions(questions){
  return new Promise((resolve,reject)=>{
    const size = questions.length  ; 
    let countre =0 ; 
    questions.forEach((q)=>{
        console.log(q)
        getqOptions(q).then((options)=>{
            //console.log(countre)
            q.options = options
            ++countre

           console.log(q)
            if(countre === size){
               // console.log(questions)
                resolve(questions);
            }
        })
    })})
}
exports.testgetQuestions = (poll_id) =>{
    getQuestions(poll_id).then((questions) =>{
        console.log(questions)
        getQuestionsOptions(questions).then((questions)=>{
        
        })
    })

}
