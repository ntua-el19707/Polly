// require models
const sequelize = require('../../utils/database');
var initModels = require("../../models/init-models");
const e = require('express');
const Questions = require('../../models/Questions');
var models = initModels(sequelize);
exports.questionaire  = (req,res,next)=>{
    const id = req.params.id ;
    if(!id){
        res.status(400).json({status:"failed",reason:"you have not selected poll via route parameter"})
    }
    else{
        
       //     const id = parseInt(id);
         if(!isNaN(id)){
            const pid = parseInt(id);
            let rsp = {};//e,py json object
            let fetchpoll = new  Promise((resolve,reject)=>{
                models.Polls.findByPk(pid).then((poll)=>{
                    let p = poll.dataValues;
                    rsp = {questionnaireID:`QQ${p.poll_id}`,questionnaireTitle:poll.title,creator:p.email,apid:pid,...rsp}
                    resolve();
                }).catch(err =>{
                    console.log(err)
                    resolve();
                })
            }) 
            
            Promise.all([fetchpoll]).then(()=>{
                //now find the first one 
                let fetch_questions = new Promise((resolve,reject)=>{
                    models.Questions.findAll({where:{poll_id:pid},order:[['sequence','ASC']]}).then(
                        (q)=>{
                            let json =  [] ;   
                               for(let i = 0 ; i<q.length;i++){
                               let el = q[i].dataValues;
                              // console.log(el)
                               json = [{
                                qID:`Q${el.sequence}`,
                                qtext:el.qtext ,
                                type:el.qtype,
                                required:el.required === 1 ? "TRUE":"FALSE",
                                actualid:el.question_id
                               },...json]
                            }
                            json.reverse();
                           // console.log(json);
                            rsp.questions =json ;
                            resolve();
                        }
                    ).catch(err=>{
                        console.log(err)
                        resolve();
                    })
                })
              
                Promise.all([fetch_questions]).then(()=>{
                    let fetch = new Promise((resolve,reject)=>{
                    let count = 0 ;
             
                    (rsp.questions).forEach(element => {
                        let fetchOptions = new Promise((resolve,reject)=>{
                            models.answers.findAll({where:{question_id:element.actualid},order:[['sequence','ASC']]}).then((a)=>{
                                ++count ;
                                let json =  [] ;   
                                console.log(element)
                                for(let i = 0 ; i<a.length;i++){
                                let el = a[i].dataValues;
                                console.log(el)
                               // console.log(el)
                                json = [{
                                 aID:`${element.qID}A${el.sequence}`,
                                 atext:el.atext ,
                                 dpented:el.depented_qid,
                                 
                                },...json]}
                                 element.options = json.reverse()
                                resolve();
                            }).catch(err=>{
                                console.log(err)
                                resolve()
                            })


                        })
                        Promise.all([fetchOptions]).then(()=>{
                           if(rsp.questions.length == count){
                            resolve();
                           }
                        })
                    })
                        
                    });

                   Promise.all([fetch]).then(() =>{ 
                 //   console.log(rsp)
                    res.status(200).json(rsp);})
                    
           })})
         }
         else{
            res.status(400).json({status:"failed",reason:"you gave string instead of number"})
         }
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