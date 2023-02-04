const sequelize = require('../utils/database');
const  initModels = require("../models/init-models");
const models = initModels(sequelize);
const path = require('path');
const fs = require('fs');
const jsonwebtoken = require('jsonwebtoken');
const pathToKey = path.join(__dirname, '../config/keys', 'privateforgotJWT.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

const pathToPKey = path.join(__dirname, '../config/keys', 'publicforgotJWT.pem');
const Pub_KEY = fs.readFileSync(pathToPKey, 'utf8');
const {issueJWTForgot,genpass} = require('../utils/StringGen')
const nodemailer = require("nodemailer");
const { resolveObjectURL } = require('buffer');
exports.forgot = (req,res,next) =>{
    let erroroccurs = false; 
    const email = req.body.user  ; 
    if(!email){
        res.status(400).json({msg:"you have not give an email"})
    }else{
        let user  = null ;
        let fetchUser =  new Promise((resolve,reject)=>{
        models.users.findByPk(email).then((us)=>{
            if(us){
            if(us.dataValues){
            user = us.dataValues.email};}
            resolve()})
        }).catch(err=>{
            user = null ;
            resolve();
        })
        //next Step 
        Promise.all([fetchUser]).then(()=>
        
        {
            if(user !== null){
                let tokkenLink = issueJWTForgot(user,'20m',process.env.ResetKey);
                const data = {
                    from: process.env.SystemEmail,
                    to: user,
                    subject:'RESET PASSWORD',
                    msg:`Please click on the folowing link: \n ${process.env.ClientUrl}activate/forgotPassLink/${tokkenLink.token}`
                    
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
                let sendDataPromise  = new Promise((resolve,reject) =>{
                    
                    
                    resolve()
                   /*Trasporter.sendMail({
                        from:data.from,
                        to:data.to,
                        subject:data.subject,
                        text:data.msg
                    }).then(()=>{
                        resolve();
                    }).catch(err=>{
                        console.log(err)
                        erroroccurs = true ; 
                        resolve()
                    })*/
                })
                console.log(data)
                Promise.all([sendDataPromise]).then(() =>{
                if(!erroroccurs){
                res.status(200).json({msg:"link created"})}
            else{
                res.status(400).json({err:"mail failed to send "} );
            }})
            }else{
                res.status(404).json({err:"User not Found in database"});
            }

        })
    }
}

exports.changepass = (req,res,next) =>{
    console.log(req.header);
    if(req.jwt){
        const pass1 = req.body.pass1 ; 
        const pass2 = req.body.pass2 ; 
        const email = req.jwt.sub ;
        //console.log(email)
        if(pass1 && pass2){
        
        if(pass1 === pass2 ){
            let ChangePassPromise = new Promise((resolve,reject)=>{
                        //all "ok" 
                        let critentials = genpass(pass1); //password created ;
                      //  console.log(critentials.hash)
                       // console.log(email)
                         models.users.update({hashpw:critentials.hash,  saltpw:critentials.salt},{
                            where: {
                              email: email
                            }}).then((user) =>{
                                console.log(user)
                                res.status(200).json({user:"Password has changed",subforlogin:email,status:"ok"});
                                resolve();}
                            ).catch(err=>{
                                res.status(400).json({msg:err,status:"error"});//search specific erros ; and implement catch 
                                resolve();
                            })
                       
                    
                    })
            Promise.all([ChangePassPromise]).then();
        }else{
            res.status(400).json({err:"pass and confirm pass do not match "})
        }
    }else{
        res.status(400).json({err:"passwords hase not been recieved "});
        
    }}else{
        res.status(400).json({err:"This must not been recieved "})
    }

} 
exports.testJwt = (req,res,next)=>{

	const token = req.params.tokkenLink ;
	console.log(`token:${token}`);    
    //console.log(req.headers)
    //let target_target_token = req.headers.authorization
   // console.log(target_target_token)
   try{
    //  console.log(req.headers)
    const token_parts = token;
    //console.log(token_parts[0])
     if( /*token_parts[0] === process.env.ResetKey && */token_parts.match(/\S+\.\S+\.\S+/) !== null){
      //patern match 
      
      try{
      const  verificattion = jsonwebtoken.verify(token_parts,Pub_KEY,{algorithms:['RS512']})
     // console.log(verificattion)}
     req.jwt = verificattion;
    
     if(req.jwt.iat < req.jwt.exp){
     res.status(200).json({msg:'valid'});
        ;}else{
      res.status(401).json({success:false,msg:'tokken expired'})
     }}
      catch(err){
        console.log(err)
        res.status(401).json({success:false,msg:'You are anothorized!'})
      }
    }else{
      res.status(401).json({success:false,msg:'You are anothoprized!'})
    }
}catch(err){
    res.status(401).json({success:false,msg:'You are anothoprized!'})
}
 
}
