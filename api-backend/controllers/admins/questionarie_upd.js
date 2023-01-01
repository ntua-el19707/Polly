const sequelize = require('../../utils/database');
const  initModels = require("../../models/init-models");
const { ValidationError } = require('sequelize');
const { questionarieFormat, getqid } = require('../../utils/format');

const models = initModels(sequelize);

exports.create = (req,res,next) =>{
    console.log(req.body);
    
    const pid = req.body.questionnaireID;
    const pTitle = req.body.questionnaireTitle;
    const keywords = req.body.keywords;
    let poll_actual_id ; 
    if(!pid || !pTitle ||!keywords){
        //user not provide those error
    }
    let createPoll = new Promise((resolve,reject)=>{
        let id = pid.split('QQ');
        id = parseInt(id[1]);
        models.Polls.create({title:pTitle,email:req.body.user}).then((poll)=>{
            poll_actual_id = poll.poll_id;
            resolve()
        }).catch(err =>{
            console.log(err)
            resolve()})
    })
    let questions = req.body.questions;
    let create = new Promise((resolve,reject) =>{
    Promise.all([createPoll]).then(()=>{
    if(questions){
      
            /*
            "qID ": "P00",
            "qtext": "Ποιο είναι το mail σας;",
            "required": "FALSE",
            "type": "profile",
            "options": */
            
            let createquestions = new  Promise((resolve,reject) =>{
                let counter = 0 ;
                questions.forEach(q => {
                let require = 0;
                
                if(q.required =='TRUE' ){
                    require =1 ;
                }
            let s =q.qID.split('Q');
            //console.log(sint)
            models.Questions.create({qtext:q.qtext,sequence:s[1],qtype:q.type, required:require,poll_id:poll_actual_id}).then((qnew)=>{
                q.actual_id = qnew.question_id;
               ++counter;
               //console.log(counter)
           if(counter === questions.length){
            resolve();
           // console.log(2)
           } 
             
            }).catch(err=>{
                //to do 
                console.log(err)
             resolve();
            
            })
            
            
        })
        
    })

        Promise.all([createquestions]).then(()=>{
            console.log(questions)
            let createquestionsansers = new  Promise((resolve,reject) =>{
             let counter = 0 ;
            questions.forEach(q => {
              
                let options = q.options;
                if(options){
                let createoptions =new Promise((resolve,reject)=>{
                let ocounter = 0 ;
                options.forEach(o=>{
                let t =null;
                let search = new Promise((resolve,reject)=>{
                    let i = 0 ;
                    
                    questions.forEach((qi)=>{
                        //console.log('q  '+qi)
                      //  console.log(o.nextqID)
                       if(qi.qID === o.nextqID ){
                           t = qi.actual_id
                           console.log(t + "depented ")
                           resolve()
                       }else{
                           ++i
                           if(i === questions.length){
                               resolve();
                          }
                       }
               
               
                   })
                })
                
                Promise.all([search]).then(()=>{
                    let s = o.optID.split('A')
                     if(o.optID.includes('TXT')){
                        s[1] = '1'
                     }
                    
                    models.answers.create({ sequence:s[1],atext:o.opttxt,depented_qid:t,question_id:q.actual_id}).then((onew)=>{
                        ++ocounter;
                        if(ocounter === options.length){
                            resolve();
                        }
                    }).catch(err=>{
                        //to do 
                        console.log(err)
                        resolve();
                    })
                })

            
         
           
                })
        })
        Promise.all([createoptions]).then(()=>{
            ++counter
            if(counter==questions.length){
                resolve();
            }
        })
        
        }else{
            ++counter
            if(counter == questions.length){
                resolve();
            }
        }
                
            });
        })
        Promise.all([createquestionsansers]).then(()=>{
            resolve();
        });
        })

    }
    })})
    Promise.all([create]).then(()=>{
        res.json({msg:'ok'})
    })
} 
exports.update = (req,res,next) =>{
    //Here  i am gone  to implement a a  put methods
    //json eisdoxi
    const id = req.params.id ; 
    const Creator =  req.params.Creator ; 
    const old = req.body.old;
    let counter = 0 ;
    let size = old.length ;
    if(questionarieFormat(old)){
    let update_all_questions = new Promise((resolve,reject) =>{
        old.forEach(el=>{
           models.Questions.update({qtext:el.qtext,sequence:getqid(el.qID),qtype:el.type, required:get(el.required),poll_id:id},{where:{
question_id:el.actual_id
        }}).then(() =>{
            ++counter
            if(size === counter){
                resolve();
            }
        }).catch(err =>{
            console.log(err)
            reject();
        })
        })
        //do options;
    
    });
    Promise.all([update_all_questions]).then(()=>{
        res.json({msg:'ok'});1
    })
    }else{
        res.status(400).json({msg:"There is not a corecct format to your json file for existing Questions"
     , validFormatMsg:`[{
            "qID": "Q{Number<=99}",
            "qtext": "{question}",
            "required": "FALSE" | "TRUE",
            "type": "profile" | "question",
            "options": [
                    {
                     "optID": "Q{Number<=99}TXT",
                     "opttxt": "<open string>",
                     "nextqID": "Q{Number}"
                    },{
                     "optID": "Q{Number<=99}A{Number<=9}",
                     "opttxt": "<open string>",
                     "nextqID": "Q{Number<=99}"
                    } ]},
        {same},...]
        `
})
    }
 
    
}
function get(type){
    if(type === 'FALSE'){
        return false;
    }
    return true ;
}