const sequelize = require('../../database');
const  initModels = require("../../../models/init-models");
const chalk = require('chalk');
const { questionarieFormat, getqid, getaSequence,questionarieIdCheck } = require('../../format');


const models = initModels(sequelize);

function get(type){
    if(type === 'FALSE'){
        return 0;
    }
    return 1;
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
         //   console.log(o.nextqID)
     sequence = getqid(o.nextqID)
    }
        models.Questions.findOne({ where: { poll_id:parseInt(poll_id) ,sequence:sequence } }).then((q)=>{
         //   console.log(chalk.green(q).toString)
            let dquestion = q;

            if(!dquestion){
                dquestion ={
                    question_id:null
                }
            }else{
                dquestion = dquestion.dataValues
            }

           // console.log(dquestion)
         
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
        console.log(options)

        if(!options){
            console.log(chalk.green('resolve'))
            resolve()
        }
        const size = options.length
        let counter = 0 ; 
        if(size === 0 ){
            console.log(chalk.green('resolve'))
            resolve();
        }
        //console.log(options)
        options.forEach(o=>{
            createoneoption(o,poll_id,question_id).then((responce)=>{
                // console.log(responce)
                ++counter ;
                if(counter === size){
                    console.log(chalk.green('resolve'))
                    resolve(`create  ${size} has completed`);
                }
            })
        })
    })
} 

function createQuestionoptions(question,poll_id){
    return new Promise((resolve,reject)=>{
        if(!question){
            resolve()
        }
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
    //let actual_id = -1; 
    let questionres;
    
    let createQ = new Promise((resolve,reject) =>{
  
   models.Questions.create({qtext:question.qtext,sequence:getqid(question.qID),qtype:question.type, required:get(question.required),poll_id:id
    }).then((q) =>{
         questionres  = q.dataValues ;
        resolve();
    }).catch(err =>{
        //console.log(err)
        actual_id =-1;
        reject(err)
    })})
    createQ.then(()=>{
        //console.log(actual_id)
        resolve(questionres);
        
    }).catch(err=>{
        reject(err)
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
        console.log(chalk.green('resolve'))
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
    let require =get(question.required)
    //console.log(chalk.green('here    '))
    //console.log(question)
    models.Questions.update({atext:question.qtext,sequence:getqid(question.qID),qtype:question.type,required:require,poll_id:id},{where:{
        question_id:question.actual_id
    }}).then(() =>{
       // console.log(question)
        resolve()
        
    }).catch(err =>{
        console.log(err)
    reject(err)
    })
 })
}
function updateall(questions,id){
    return new Promise((resolve,reject)=>{
        const size = questions.length ;
        if(size === 0){
            resolve()
        }
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






function update_n_questions(options,poll_id,question_id){
    return new Promise((resolve,reject)=>{
        //console.log(options)
        const size = options.length ; 
        if(size === 0){
            console.log(chalk.green('resolve'))
            resolve() ;
        }
        let counter = 0 ; 
        options.forEach(o=>{
            updateeoption(o,poll_id).then(()=>{
                ++counter;
                if(counter === size){
                    console.log(chalk.green('resolve'))
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
        console.log(chalk.green(`about to destroy ${questionId}`))
        models.Questions.destroy( {where: {
         question_id: questionId
       }}).then(()=>{
         resolve({msg:'ok'})
       }).catch(err=>{
         console.log(err)
         console.log(chalk.red(err.toJSON()))
         resolve({err:err})
       })
     })
}
function destroy_questions(questions){
    return new Promise((resolve,reject)=>{
    console.log(chalk.green(questions))
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
function CreateKeywords(keywords,poll_id){
    return new Promise((resolve,reject)=>{
        if(!keywords){
            resolve()
        }
        const size = keywords.length ; 
        let counter =  0 ;
        if(size === 0){
            resolve();
        }
        keywords.forEach(k => {
            models.keywords.create({poll_id:poll_id, keyword:k}).then(()=>{
                ++counter ;
                if(size === counter){
                    resolve();
                }
            }).catch(err=>{
                console.log(err);
                resolve();
            })
        });

    })
}
function UpateKeywords(keywords,poll_id){
    return new Promise((resolve,reject)=>{
        //console.log(chalk.green('here'))
       // console.log(keywords)
       if(!keywords){
        resolve()
       }
        const size = keywords.length ; 
        let counter =  0 ;
        if(size === 0){
            resolve();
        }
        keywords.forEach(k => {
            models.keywords.update({poll_id:poll_id, keyword:k.keyword},{where:{ keyword_id:k.keyword_id

            }}).then(()=>{
                ++counter ;
                if(size === counter){
                    resolve();
                }
            }).catch(err=>{
                console.log(err);
                resolve();
            })
        });

    })
}
function destroyKeyword(keywords){
    return new Promise((resolve,reject)=>{
        if(!keywords){
            resolve()
        }
        const size = keywords.length ;
        if(size === 0 ){
            resolve();
        }
        let counter  = 0;  
        keywords.forEach(k=>{
            models.keywords.destroy({where:{keyword_id:k}}).then(()=>{
                ++counter;
                
            }).catch(err=>{
                ++counter ;
                console.log(err);
            }).finally(()=>{
                if(counter === size ){
                    resolve();
                }
            })
        })
    })
}

function createoneQuestion(questionFrom,poll_id){
    return new Promise((resolve,reject)=>{
    const question = {
        question:questionFrom,
        poll_id:poll_id
    }
    
    createQuestion(question).then((resp)=>{ 
          // question.question= resp ; 
         ///  question.question.options = [];
           resolve(resp) ;
         /*  create_n_options(question.question.options).then((options)=>{
                //question.options = options; 
                resolve(question);
           })*/
    }).catch(err=>{
        console.log(err)
        reject(err)
    })
})
}
function getTitle(id){
    return new Promise((resolve,reject)=>{
        models.Polls.findByPk(id).then(poll=>{
            if(poll === null){
                resolve('')
            }
            resolve(poll.dataValues.title)
        }).catch(err=>{
            resolve('')
        })
    }) 
}
module.exports = {getTitle,createoneQuestion,updateQuestion,create_n_options,update_n_questions,destroyKeyword,destroy_questions,destroy_options}