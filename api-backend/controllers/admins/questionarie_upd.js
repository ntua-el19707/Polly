const sequelize = require('../../utils/database');
const  initModels = require("../../models/init-models");
const chalk = require('chalk');
const { questionarieFormat, getqid, getaSequence,questionarieIdCheck } = require('../../utils/format');


const models = initModels(sequelize);

function get(type){
    if(type === 'FALSE'){
        return false;
    }
    return true ;
}

 function updateeoption(o,id){
    return new   Promise((resolve,reject) =>{
        let sequence = getqid(o.nextqID)
        models.Questions.findOne({ where: { poll_id:id ,sequence:sequence } }).then((q)=>{
            let dquestion = q;

            if(!dquestion){
                dquestion ={
                    question_id:null
                }
            }else{
                dquestion = q.dataValues
            }
            //console.log('update is about to happen')
            models.answers.update({ sequence:getaSequence(o.optID),atext:o.opttxt,depented_qid:dquestion.question_id/*,question_id:o=el.actual_id*/},{where:{answer_id:o.actual}}).then((onew)=>{

                    console.log('update');
                    resolve();
                
            }).catch(err=>{
                //to do 
                console.log()
                console.log(err)
                resolve();
            })
           
   
        }).catch(err=>{
            console.log(err)
         resolve()
        });
        //resolve();
    })

  
}
function  createoneoption(o,poll_id,question_id){
    return new Promise((resolve,reject) =>{
        let sequence =null;
        if(o.nextqID === '-'){
        
        }{
            console.log(o.nextqID)
     sequence = getqid(o.nextqID)
    }
        models.Questions.findOne({ where: { poll_id:parseInt(poll_id) ,sequence:sequence } }).then((q)=>{
            //console.log(q)
            let dquestion = q;

            if(!dquestion){
                dquestion ={
                    question_id:null
                }
            }else{
                dquestion = dquestion.dataValues
            }
           // console.log('Create is about to happen')
           
            models.answers.create({ sequence:getaSequence(o.optID),atext:o.opttxt,depented_qid:dquestion.question_id,question_id:question_id}).then((onew)=>{
                    resolve(onew);
                
            }).catch(err=>{
                //to do 
                console.log(err)
               // console.log(o)
                resolve();
            })
           
   
        }).catch(err=>{
            console.log(err)
         resolve()
        });
        resolve();
    })

  
}

function create_n_options(options,poll_id,question_id){
    return new Promise((resolve,reject)=>{
        const size = options.length
        let counter = 0 ; 
        if(size === 0 ){
            resolve();
        }
        //console.log(options)
        options.forEach(o=>{
            createoneoption(o,poll_id,question_id).then((responce)=>{
                // console.log(responce)
                ++counter ;
                if(counter === size){
                    resolve(`create  ${size} has completed`);
                }
            })
        })
    })
} 

function createQuestionoptions(question,poll_id){
    return new Promise((resolve,reject)=>{
        const size = question.length ; 
        let counter = 0 ;
        question.forEach((q)=>{
            //console.log(`about`);
            //console.log(q.options)
            create_n_options(q.options,poll_id,q.actual_id).then((responce)=>{
             //   console.log(responce);
                ++counter;
                if(counter === size){
                    resolve();
                }
            })
        })
    })
}


 function createQuestion(obj){
    return new Promise((resolve,reject) =>{const question  = obj.question ; 
    const id = obj.poll_id;
    let actual_id = -1; 
    let createQ = new Promise((resolve,reject) =>{

    
   models.Questions.create({qtext:question.qtext,sequence:getqid(question.qID),qtype:question.type, required:get(question.required),poll_id:id
    }).then((q) =>{
         actual_id  = q.dataValues.question_id ;
        resolve();
    }).catch(err =>{
        console.log(err)
        actual_id =-1;
        resolve();
    })})
    createQ.then(()=>{
        //console.log(actual_id)
        resolve(actual_id);
        
    })})
}

 function create_n_questions(questions,id){
    return new Promise((resolve,reject) =>
    {
    const size = questions.length ; 
    let counter = 0 ; 
    //console.log('to create')
    //console.log(questions)
   // console.log(questions)
    if(size=== 0){
        //console.log('resolve')
        resolve();
    }
    let promsieCreatethemall = new Promise((resolve,reject)=>{
    questions.forEach((q)=>{
        const question = {
            question:q,
            poll_id:id
        }
        let actual_id;
     let wait= new Promise((resolve,reject)=>{
      actual_id =   createQuestion(question).then((resp)=>{
           // console.log(resp)
           actual_id = resp
            ++counter;
            resolve()
        })})
    wait.then(()=>{
        q.actual_id = actual_id;
        if(counter === size){
           console.log('create all')
            resolve(questions);
        }
    })
    })
})

    
promsieCreatethemall.then(()=>{
    
    //onsole.log('complete');
    //console.log(questions)
    resolve(questions);
  
})
})
}
exports.create = (questions,id) =>{
    let PromiseCreate = new Promise((resolve,reject)=>{
    create_n_questions(questions,id).then(()=>{
        resolve();
    });})
    PromiseCreate.then(()=>{
        return true;
    })
}
function updateQuestion (obj){
 return new  Promise((resolve,reject)=>{
    const question = obj.question ;
    const id = obj.poll_id ;
    models.Questions.update({qtext:question.qtext,sequence:getqid(question.qID),qtype:question.type, required:get(question.required),poll_id:id},{where:{
        question_id:question.actual_id
    }}).then((q) =>{
       // console.log(question)
        resolve({msg:'ok'})
        
    }).catch(err =>{
        console.log(err)
        resolve({msg:'err',err:err});
    })
 })
}
function updateall(questions,id){
    return new Promise((resolve,reject)=>{
        const size = questions.length ;
        let counter = 0 ; 
        let finsihAll = new Promise((resolve,reject)=>{
        questions.forEach((q)=>{
            const obj = {
                question:q,
                poll_id:id
            }
            updateQuestion(obj).then((resp)=>{
                //console.log(resp);
                if(resp.msg === 'ok'){
                   // console.log(resp.question)
                    q= resp.question;
                }
           
                ++counter;
                if(counter === size){
                  //  console.log('update all')
                    resolve();
                }
            })
        })
    })
    finsihAll.then(()=>{
        resolve(questions)
    })
})
}
exports.updatequest =  (questions,id)=>{
    return new Promise((resolve,reject)=>{
        updateall(questions,id).then((q)=>{
           // console.log('Final')
            //console.log(q);
            resolve();
        })
    })
}

exports.realUpdate = (req,res,next)=>{
    const id = parseInt(req.params.id) ; 
    const Creator =  req.jwt.sub ; 
    const old = req.body.oldq;
    const newq = req.body.newq ;
    let updateOld = new Promise((resolve,reject) =>{
        updateall(old).then(()=>{
            
            resolve();})
    })
    let insertnew = new Promise((resolve,reject)=>{
        create_n_questions(newq,id).then(()=>resolve());
    })
    Promise.all([updateOld,insertnew]).then(()=>{
        res.status(200).json({msg:'ok'})
    })
}
exports.createPoll = (poll) =>{
    return new Promise((resolve,reject) =>{ 

       // let id = pid.split('QQ');
        //id = parseInt(id[1]);

        models.Polls.create({title:poll.pTitle,email:poll.author}).then((poll)=>{
            poll_actual_id = poll.dataValues.poll_id;
           // console.log(poll)
           // res.json({poll:poll})
            resolve(poll.dataValues)
        }).catch(err =>{
            console.log(err)
            resolve()})
    })
}
exports.testNewQUESTIONARIE = (questions,poll_id) =>{
    return new Promise((resolve,reject)=>{
        create_n_questions(questions,poll_id).then((questionsnew)=>{
            createQuestionoptions(questionsnew,poll_id).then(()=>{
                resolve();
            })
        })
    })
}


exports.postCreate  = (req,res,next) =>{
    const pid = req.body.questionnaireID;
    const pTitle = req.body.questionnaireTitle;
    const keywords = req.body.keywords;
    let questions  = req.body.questions;
    if(questionarieIdCheck(pid)){
        //error => not correct questionarie Id format
        res.status(400).json({err:'not correct Format of Questionarie ID ',hint:'*correct Format QQ{primary key int}'}) ;
    }else{
        if(!pTitle){
            res.status(400).json({err:'not given questionnaireTitle'}) ;
        }else{
            const poll = {pTitle:pTitle,author:req.jwt.sub}
          
            this.createPoll(poll).then((poll) =>{
                const poll_id = poll.poll_id;
                if(/*questionarieFormat(questions)*/ true){
              
                    create_n_questions(questions,poll_id).then((questionsnew)=>{
                        createQuestionoptions(questionsnew,poll_id).then(()=>{
                            res.status(200).json({msg:'pollCreated',poll_id:poll_id})
                        })
                    })
                }else{
                    res.status(400).json({err:'Wrong Format of questions'}) ;
                }
            })
        }
    }

}
exports.putupdate = (req,res,next) =>{
    const pid = req.params.id;
    const pTitle = req.body.questionnaireTitle;
    const keywords = req.body.keywords;
    const oldQ = req.body.oldq ;
    let newQ = req.body.newq ;
     const destroy = req.body.destroy
    
    if(!pTitle){
        res.status(400).json({err:'not given questionnaireTitle'}) ;
    }else{
        const poll_id = parseInt(pid);
        const poll = {pTitle:pTitle,author:req.jwt.sub,poll_id:poll_id}
        
        
            if(/*questionarieFormat(oldQ) && questionarieFormat(newQ)*/ true){
              let createPromsie = new Promise((resolve,reject)=>{
                create_n_questions(newQ,poll_id).then((questionsnew)=>{
                         newQ = questionsnew ;
                         if(!questionsnew){
                           newQ = [];
                           
                         }
                       
                        resolve();
                    })
                })
              
              Promise.all([createPromsie,updateall(oldQ,poll_id),updatePoll(poll)]).then(()=>{
                //res.status(200).json({msg:'prosorino ok'});
                Promise.all([updateAllQuestionOptions(oldQ,poll_id),updateAllQuestionOptions(newQ,poll_id)]).then(()=>{
                    //res.status(200).json({msg:'prosorino ok'});
                    destroy_options(destroy.optId).then(()=>{
                        destroy_questions(destroy.qid).then(()=>{
                            res.status(200).json({msg:'prosorino ok'});
                        })
                    })
                })
            })
              
             
            }else{
                res.status(400).json({err:'Wrong Format of questions'}) ;
            }
        
    }

}
function update_n_questions(options,poll_id,question_id){
    return new Promise((resolve,reject)=>{
        //console.log(options)
        const size = options.length ; 
        if(size === 0){
            resolve() ;
        }
        let counter = 0 ; 
        options.forEach(o=>{
            updateeoption(o,poll_id).then(()=>{
                ++counter;
                if(counter === size){
                    resolve()
                }
            })
        })
    })
}
function updateAllQuestionOptions(questions,poll_id){
    return new Promise((resolve,reject)=>{
          console.log(chalk.yellow('upadate aqll'))
          console.log(chalk.yellowBright(questions.length))
         /* if(!questions){
            console.log(chalk.gray('resolve'))
            resolve()
          }*/
        const size = questions.length ; 
        if(size === 0){
            console.log(chalk.yellow('resolve'))
            resolve() ;
        }
        let counter = 0; 
        questions.forEach((q)=>{
            Promise.all([create_n_options(q.options.newop,poll_id,q.actual_id),update_n_questions(q.options.oldop,poll_id,q.actual_id)]).then(()=>{
              ++counter ;
              if(counter === size ){
                console.log('resolve')
                resolve()
              }
            })
        })

    })
}
function updatePoll (poll){
    return new Promise((resolve,reject) =>{ 

       // let id = pid.split('QQ');
        //id = parseInt(id[1]);

        models.Polls.update({title:poll.pTitle,email:poll.author},{where:{poll_id:poll.poll_id}}).then(()=>{
            //console.log(poll)
         //   console.log(polsl)
           // res.json({poll:poll})
            resolve()
        }).catch(err =>{
            console.log(err)
            resolve()})
    })
}
function destroy_one_options(optId){
    return new Promise((resolve,reject)=>{
       models.answers.destroy( {where: {
        answer_id: optId
      }}).then(()=>{
        resolve({msg:'ok'})
      }).catch(err=>{
        console.log(err)
        resolve({err:err})
      })
    })
}

function destroy_options(options){
    return new Promise((resolve,reject)=>{
        const size = options.length ;
        if(size === 0 ){
            resolve();
        }
        let counter = 0  ;
        options.forEach(o=>{
            destroy_one_options(o).then((rsp)=>{
                ++counter ;
                if(counter === size){
                    resolve();
                }

            })
        }) 
    })
}
function destroy_one(questionId){
    return new Promise((resolve,reject)=>{
        models.Questions.destroy( {where: {
         question_id: questionId
       }}).then(()=>{
         resolve({msg:'ok'})
       }).catch(err=>{
         console.log(err)
         resolve({err:err})
       })
     })
}
function destroy_questions(questions){
    return new Promise((resolve,reject)=>{
      const size = questions.length ;
      if(size ===0){
        resolve();
      }
      let counter   = 0 ; 
      questions.forEach((q)=>{
        destroy_one(q).then((rsp)=>{
            //console.log(rsp);
            ++counter ; 
            if(size === counter){
                resolve();
            }
        })
      })
    })
}