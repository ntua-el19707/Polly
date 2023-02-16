const sequelize = require('./utils/database');
var initModels = require("./models/init-models");
const { insertSessions } = require('./utils/lib/reports');
const { where } = require('sequelize');

var models = initModels(sequelize);

function findquestionQid(poll_id,Sequence){
    return new Promise((resolve,reject)=>{
        models.Questions.findOne({where:{
            poll_id:poll_id,sequence:Sequence
        }}).then((q)=>{
            if(q){
                resolve(q.dataValues.question_id)
            }else{
                reject({errmsg:'not such question'})
            }
      
        }).catch(err=>{
            reject(err)
        })
    })
}
const poll_id =parseInt(process.argv[2]);
const session = process.argv[3];
const sequence = process.argv[4];
/*findquestionQid(155,'2').then(q=>{
    console.log(q)
}).catch(err=>{
    console.log(err)
})*/
console.log(process.argv)
function createSessionAndAnswerOne(){
    let qid;
    return new Promise((resolve,reject)=>{
        Promise.all([insertOneSession(session,poll_id),findquestionQid(poll_id,sequence)]).then((rsp)=>{
            findone(rsp[1]).then((a)=>{
                fill_for_stats(a,rsp[0],rsp[1]).then(()=>{
                    console.log('ok')
                    resolve()
                }).catch(err=>{
                    reject(err)
                })
            }) 

             
           
        }).catch(err=>{
            console.log(err)
            reject(err)
        })
    })
}
function insertOneSession(session,poll_id){
    return new Promise((resolve,reject)=>{
         models.report_answers.create({
            session_id:session,poll_id:poll_id
         }).then((s)=>{
         //   console.log(s)
            resolve(s.dataValues.report_id)
         }).catch(err=>{
            reject(err)
         })
    })
}
function findone(qid){
    return new Promise((resolve,reject)=>{
        models.answers.findOne({where:{question_id:qid}}).then(r=>{
            resolve(r.dataValues.answer_id)
        }).catch(err=>{
            reject(err)
        })
    })
}
createSessionAndAnswerOne().then(()=>{

    console.log('OK')
}).catch(err=>{})

function fill_for_stats(answer_id,report_id,question_id){
    return new Promise((resolve,reject)=>{
        if(question_id === null){
            resolve()
        }
        console.log(question_id)
        models.reportforstats.create({
            report_id:report_id,
            question_id:question_id,
            answer_id:answer_id
        }).then(()=>{resolve()}).catch(err=>{
             console.log(err)
            reject(err)})
    })
    }
