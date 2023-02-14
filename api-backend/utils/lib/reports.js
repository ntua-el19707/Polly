const sequelize = require('../database');
const  initModels = require("../../models/init-models");
const chalk = require('chalk');
var models = initModels(sequelize);
function insertOneSession(session,poll_id){
    return new Promise((resolve,reject)=>{
         models.report_answers.create({
            session_id:session,poll_id:poll_id
         }).then(()=>{
            resolve()
         }).catch(err=>{
            reject(err)
         })
    })
}
function insertSessions(sessions,poll_id){
    return new Promise((resolve,reject) =>{
    const size= sessions.length ; 
    if(size === 0){
      resolve()
    }
    let counter = 0 ; 
    sessions.forEach(session => {
        insertOneSession(session,poll_id).then(()=>{}).catch(err=>{
            console.log(err)
        }).finally(()=>{
            ++counter ; 
            if(counter === size){
                resolve()
            }
        })
    });
})
}
function findReportId(session,poll_id){
    return new Promise((resolve,reject) =>{
    models.report_answers.findOne({
        where:{
            session_id:session,poll_id:poll_id
            }
        }).then((rsp)=>{
            if(rsp === null){
                reject({err:'not exist'})
            }
        resolve(rsp.dataValues.report_id)
    }).catch(err=>{
        reject(err)
    }) 

})
}
function fill_non_stats(opttxt,report_id,question_id){
    return new Promise((resolve,reject)=>{
        if(question_id === null){
            resolve()
        }
        models.reportfornotstats.create({
            report_id:report_id,
            question_id:question_id,
            answer_text:opttxt
        }).then(()=>{resolve()}).catch(err=>{reject(err)})
    })

}
function fill_for_stats(answer_id,report_id,question_id){
return new Promise((resolve,reject)=>{
    if(question_id === null){
        resolve()
    }
    if(answer_id === null){
        resolve()
    }
    models.reportforstats.create({
        report_id:report_id,
        question_id:question_id,
        answer_id:answer_id
    }).then(()=>{resolve()}).catch(err=>{reject(err)})
})
}
function fill_stats(reportId,stats){
    return new Promise((resolve,reject)=>{
    const size = stats.length ;
    if(size===0){
        resolve();
    }
    console.log(chalk.green('green'))
    console.log(stats)
    let counter = 0 ;
    stats.forEach(s=>{
        if(s.opttxt){
            fill_non_stats(s.opttxt,reportId,s.question_id).then(()=>{}).catch(err=>{console.log(err)}).finally(()=>{
                ++counter;
                if(counter === size){
                    resolve()
                }
            })
        }else{
            fill_for_stats(s.answer_id,reportId,s.question_id).then(()=>{}).catch(err=>{console.log(err)}).finally(()=>{
                ++counter;
                if(counter === size){
                    resolve()
                }
            })
        }
    })
})
}
function destroy_sesions(poll_id){
    return new Promise((resolve,reject)=>{
    models.report_answers.destroy({where:{poll_id:poll_id}}).then(()=>{
        console.log(chalk.red(`purge - all Sessions of${poll_id}`)
        )
        resolve()
    }).catch(err=>{
        reject(err)
    })
})
}
function validSessionCheck(poll_id,session){
    return new  Promise((resolve,reject)=>{
         console.log(`${poll_id} session ${session}`)
        models.report_answers.findOne({where:{
            poll_id:poll_id,   session_id:session
        }}).then(val =>{
           // console.log(chalk.green(val.dataValues.report_id))
            if(val === null){
                resolve(false);
            }
           // console.log(chalk.green(val.dataValues.report_id))
            resolve(true)
        }).catch(err=>{
            resolve(false)
        })
    })
}
module.exports = {insertSessions,findReportId,fill_stats,destroy_sesions,validSessionCheck}