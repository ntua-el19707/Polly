const sequelize = require('../../database');
require('custom-env').env('localhost')
const  initModels = require("../../../models/init-models");
const chalk = require('chalk');
const { questionarieFormat, getqid, getaSequence,questionarieIdCheck } = require('../../format');
const { testgetQuestions, getQuestionairefunction } = require('../../../controllers/answers/questionaire');
const { resolveContent } = require('nodemailer/lib/shared');
const { destroy_sesions, insertSessions, findReportId, fill_stats } = require('../reports');
const { generateSessions } = require('../../StringGen');
const reportforstats = require('../../../models/reportforstats');
const models = initModels(sequelize);
function randomtext(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
function getIndex(qid,top){
    if(qid ==='-'){
        return top
    }
    return (parseInt(qid.split('Q')[1]))
}
//console.log(process.env)
function answer(poll_id,total){
  
return new Promise((resolve,reject)=>{
//  let  organized;
getQuestionairefunction(poll_id).then((poll)=>{
    let counter =0 ;
    let allAnswers =[]
     let organized= poll.questions;
    // console.log(organized)
    if(total ===0){
        resolve()
    }
    //let allAnswers = [] ;
    for(let i=0 ;i<total ;i++){
    let index = 0 ;
    let answers = [] ;
  //  console.log(poll.questions.length )
    while(index < poll.questions.length){
      

            if(poll.questions[index].options.length === 1 ){
                if(poll.questions[index].options[0].opttxt === "<open string>"){
                   
                    answers.push( {opttxt:randomtext(15),question_id:poll.questions[index].actualid})
                    index = getIndex(poll.questions[index].options[0].nextqID,poll.questions.length)
                    continue ;
                }
            }
            const answer = getRandomInt(poll.questions[index].options.length);
            
            if(!organized[index].options[answer].check){
              organized[index].options[answer].check =1 ;
            }else{
              organized[index].options[answer].check =    organized[index].options[answer].check +1 ;
            }
            answers.push({answer_id:poll.questions[index].options[answer].actual,question_id:poll.questions[index].actualid})
            //console.log(poll.questions[index].options[answer].nextqID)
            index = getIndex(poll.questions[index].options[answer].nextqID,poll.questions.length)
          //  console.log(index)
            if(index >= poll.questions.length){
                break;
            }
        
        
    
          
        
    }
    //console.log(answers)
    ++counter;
    allAnswers.push(answers)
    if(counter === total){
      let rsp2 = [] ; 
      organized.forEach(o=>{
       //  let item = {qid:o.qID,qtext:o.qtext}
         let opj = [] ;
         let totalch =0 ;
         o.options.forEach(op=>{
        
           if(op.check){
              totalch += op.check;
           }
         
        })
        if(totalch === 0){
          tatalch=1;
        }
         o.options.forEach(op=>{
           let percetage = null;
            if(op.check){
              percetage = (op.check/totalch)*100;
            }
            opj.push({aid:op.optID,opttxt:op.opttxt,percetage:percetage})
         })
         rsp2.push({qid:o.qID,qtext:o.qtext,options:opj})
      })
      resolve({all:allAnswers,stats:rsp2})
    }
}
}).then((all)=>{
  resolve(all)
})
})


}
const poll_id =17; 
const total = 200 ;
Promise.all([answer(poll_id,total),destroy_sesions(poll_id)]).then((rsp)=>{
  console.log(chalk.green(`Create stats for poll_id`))
  const all = rsp[0].all
  const stats = rsp[0].stats
  let sessions = [] ;
  for(let i =0 ; i<total;i++){
    sessions.push(generateSessions())
   }
  //console.log(sessions);
  new Promise((resolve,reject)=>{
  insertSessions(sessions,poll_id).then(()=>{
    console.log(chalk.green(`insert new sessions`));
    resolve()
  }).then(()=>{
    let reportsCounter = 0 ; 
    let counterIndex = -1;
    sessions.forEach((s)=>{
      findReportId(s,poll_id).then((rsp)=>{
        //console.log(rsp)
        ++counterIndex;
      //  console.log(all[counterIndex])
        fill_stats(rsp,all[counterIndex]).then(()=>{++reportsCounter}).finally(()=>{
          if(reportsCounter === total){
            console.log('ok')
           stats.forEach(s=>{
            console.log(s)
           })
            resolve()
          }
        })
      })
    })
  })
   })
}).catch(err=>{
  console.log(err)
})

