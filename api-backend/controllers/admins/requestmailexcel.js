
        // require models
        const sequelize = require('../../utils/database');
        var initModels = require("../../models/init-models");
        const chalk = require('chalk');
const { route } = require('../../routes/api/Answer/questionnaire');
const { JSONToCSV } = require('../../utils/lib/jsontocsv');
const {writeFileSync} = require('fs');
const { generateSessions } = require('../../utils/StringGen');

const XLSX = require('xlsx')
const nodemailer = require("nodemailer");
        var models = initModels(sequelize);
        
        exports.GetMatehodrequestmailexcel = (req,res,next) =>{
        
        }
        exports.GetMatehodParamsrequestmailexcel = (req,res,next) =>{
            const requestmailexcel_id = req.params.requestmailexcel_id ;
        }
        exports.PostMatehodrequestmailexcel = (req,res,next) =>{
           const stats = req.body.statsq;
            const context =  readjson(stats);
            //const session = generateSessions();
            const filename =`Stats.csv`
            const data = {
                from: process.env.SystemEmail,
                to: req.jwt.sub,
                subject:'Request Stats',
              
                
            }
            const  Trasporter  = nodemailer.createTransport({
                host: 'smtp.gmail.com',
              port:465,
                secure: true, 
                auth:{
                   
                    user:process.env.SystemEmail,
                    pass:`${process.env.SystemMailpass}`,
                   
                    

                }
            })
           /* var ns = XLSX.utils.book_new();
            ns.props = {
              title: "Stats",
              subject: "analutic 0 test",
              Ather: "Shan",
              createdDate: Date.now(),
            };
            ns.SheetNames.push("Stats");
           
            var nb = XLSX.utils.aoa_to_sheet(context);
            ns.Sheets["Stats"] = nb;
            //console.log(nb)
            var nbOut = XLSX.write(ns, { bookType: "xlsx", type: "binary" });
            console.log(req.jwt.sub)*/
         
                    
                    

                   Trasporter.sendMail({
                        from:data.from,
                        to:data.to,
                        subject:data.subject,
                        attachments:[{filename:filename, content: context ,
                            }]
                    }).then(()=>{
                      
                        res.status(200).json({msg:'ok'})
                    }).catch(err=>{
                        console.log(err)
                        res.status(400).json({msg:err})
                     //   resolve()
                    })
                
           // console.log()
     
        }
        exports.PutMatehodrequestmailexcel = (req,res,next) =>{
            const requestmailexcel_id = req.params.requestmailexcel_id ;

        }
        exports.DeleteMatehodrequestmailexcel = (req,res,next) =>{
            const requestmailexcel_id = req.params.requestmailexcel_id ;
            
        }
        exports.putMatehodrequestmailexcelNoParams = (req,res,next) =>{
       

        }
        exports.DeleteMatehodrequestmailexcelNoParams = (req,res,next) =>{
            
            
        }
        function insert(jsonobj){
            return new Promise((resolve,reject)=>{
                resolve();
            })
        }
        function update(jsonobj){
            return new Promise((resolve,reject)=>{
                resolve();
            })
        }
        function deleteFunction(jsonobj){
            return new Promise((resolve,reject)=>{
                resolve();
            })
        }
        function find(jsonobj){
            return new Promise((resolve,reject)=>{
                resolve();
            })
        }

        function readjson(json){
            let csv = "" ; 
            //console.log(json)
            json.forEach(e=> {
              //  console.log(e)
                csv +=`\nQ${e.qID}\n`
                //let table = [`Q${e.qID}`]
                let row = [] ;
                let keys = [];

                e.Stats.forEach((s)=>{
                    row.push(
                    {aid:`Q${e.qID}A${s.aid}`,atext:`${s.atext}`,percentage:s.percentage,total:s.total,freq:s.freq}
                    )
                })
               
                keys = [ 'aid', 'atext','percentage', 'total', 'freq']
                csv += JSONToCSV(row,keys)
            });
            //console.log(csv)
           return csv;
         
        }