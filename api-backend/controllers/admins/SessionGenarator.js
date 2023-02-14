
        // require models
        const sequelize = require('../../utils/database');
        var initModels = require("../../models/init-models");
        const chalk = require('chalk');
const { generateSessions } = require('../../utils/StringGen');
const { insertSessions, findReportId } = require('../../utils/lib/reports');
        var models = initModels(sequelize);
        
 
       
        exports.PostMatehodSessionGenarator = (req,res,next) =>{
            const poll_id = req.params.poll_id;
            const total = req.params.total ;
            console.log(poll_id)
            if(!isNaN(poll_id)&&!isNaN(total)){
                const poll = parseInt(poll_id) ;
                const size = parseInt(total);
                let sessions = [] ;
             for(let i =0 ; i<size;i++){
                sessions.push(generateSessions())
               
             }
             insertSessions(sessions,poll).then(()=>{
                let rsp = [];
                sessions.forEach(s=>{
                    rsp = [...rsp,`${process.env.ClientUrl}query/${poll_id}?session_id=${s}`]
                   
                })
                res.status(200).json({Links:rsp});
             }).catch(err=>{
                console.log(err)
                res.status(400).json({errmsg:'failed to create  sessions'})
             })
           //  console.log(sessions);

         //  res.status(200).json({sessions:sessions}).then(()=>{

         //  }) 
            }
            else{
                res.status(400).json('error at format poll_id and total')
            }
        }
        
      