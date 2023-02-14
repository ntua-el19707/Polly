
        // require models
        const sequelize = require('../../utils/database');
        var initModels = require("../../models/init-models");
        const chalk = require('chalk');
const { findReportId, fill_stats } = require('../../utils/lib/reports');
        var models = initModels(sequelize);
        
        exports.GetMatehodanwerstats = (req,res,next) =>{

        }
        exports.GetMatehodParamsanwerstats = (req,res,next) =>{
            const anwerstats_id = req.params.anwerstats_id ;
        }
        exports.PostMatehodanwerstats = (req,res,next) =>{
            const  stats = req.body.stats ; 
            const poll_id = req.params.poll_id;
            const session_id = req.params.session_id ;
            findReportId(session_id,poll_id).then((rsp)=>{
                fill_stats(rsp,stats).then(()=>{
                    res.status(200).json({msg:'ok answers dubmited'})
                })
            }).catch(err=>{
                res.status(400).json({msg:'not submitted'})
            })
        }
        exports.PutMatehodanwerstats = (req,res,next) =>{
            const anwerstats_id = req.params.anwerstats_id ;

        }
        exports.DeleteMatehodanwerstats = (req,res,next) =>{
            const anwerstats_id = req.params.anwerstats_id ;
            
        }
        exports.putMatehodanwerstatsNoParams = (req,res,next) =>{
       

        }
        exports.DeleteMatehodanwerstatsNoParams = (req,res,next) =>{
            
            
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

        