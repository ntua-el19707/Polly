// require models
const sequelize = require('../../utils/database');
var initModels = require("../../models/init-models");
const e = require('express');
const Questions = require('../../models/Questions');
const report_answers = require('../../models/report_answers');
//const reportforstats = require('../../models/reportforstats');

const chalk = require('chalk');
//const { doanswer } = require('../../routes/api/Answer/doanswer');
var models = initModels(sequelize);


function findreportid(poll_id,session) {
    console.log("howdy2");
    return new Promise((resolve,reject)=>{
        models.report_answers.findOne({where: { poll_id: poll_id, session_id: session} }).then((r)=>{
            let report_id = r.dataValues.report_id;
            console.log("REPORTID: " + report_id);
            resolve(report_id);
          }).catch(err=>{
          reject(err)
          })
    })
} 


function findanswerid(poll_id, question_id, option_id) {
    return new Promise((resolve,reject)=>{
        console.log("howdy1");
        models.answers.findOne({where: { question_id: question_id, sequence: option_id} }).then((q)=>{
            let ans;
            ans = q.dataValues.answer_id;
          //  console.log("AnswerID: " + ans);
            resolve(ans);            
        }).catch(err=>{
            reject(err)
            })
    })
} 

function findquestionid(poll_id, question_id) {
    return new Promise((resolve,reject)=>{
        models.Questions.findOne({where: { sequence: question_id, poll_id: poll_id} }).then((q)=>{
            let ans;
            ans = q.dataValues.question_id;
            console.log("QuestionID: " + ans);
            resolve(ans);            
        }).catch(err=>{
            reject(err)
            })
    })
} 


function enter_ans(rep_id, question_id, ans_id) { 
    return new Promise((resolve,reject)=>{
        console.log("hola2");
        models.reportforstats.create({report_id:rep_id,question_id:question_id, answer_id: ans_id}).then((ansnew)=>{
            console.log("hola3");
            resolve(ansnew);
          }).catch(err=>{
          reject(err)
          })
    })
} 

exports.doanswery = (req,res,next) =>{

    //router.post('/:qqid/:qid/:session/:optionid', doanswer);
    const poll_id = parseInt(req.params.qqid );
    const question_id = parseInt(req.params.qid );
    const session = req.params.session;
    const option_id = parseInt(req.params.optionid );
    let rep_id;
    let ans_id;
    let q_id;
    
     Promise.all([ findreportid(poll_id,session), findquestionid(poll_id, question_id)])
     .then((rsp)=>{
        rep_id=rsp[0];
        q_id=rsp[1];     
      //  res.send('1')
        findanswerid(poll_id, q_id, option_id).then((rsp2)=>{
           console.log(rsp2);
            enter_ans(rep_id,q_id,rsp2).then(()=>{
                res.status(200).json({msg:'ok'});
            }).catch(err=>{
                console.log(err);
                res.status(400).json("error")
             })}).catch(err=>{
                console.log(err)
                res.status(400).json({errmsg:err})
             })
        }).catch(err=>{
        console.log(err);
        res.status(400).json("error")
     })


    }