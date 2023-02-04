const {vaildPass} = require('../../utils/StringGen')
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const pathToKey = path.join(__dirname, '../keys', 'private.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

const pathToPKey = path.join(__dirname, '../keys', 'public.pem');
const Pub_KEY = fs.readFileSync(pathToPKey, 'utf8');
const pathToPKey2 = path.join(__dirname, '../keys', 'publicforgotJWT.pem');
const Pub_KEY2 = fs.readFileSync(pathToPKey2, 'utf8');
exports.authuser= (req,res,next) =>{
    console.log(req.body)
  
    //let target_target_token = req.headers.authorization
   // console.log(target_target_token)
    try{
    //  console.log(req.headers)
    const token_parts = req.headers.authorization.split(' ')
    //console.log(token_parts[0])
     if( token_parts[0] === 'Bearer' && token_parts[1].match(/\S+\.\S+\.\S+/) !== null){
      //patern match 
      
      try{
      const  verificattion = jsonwebtoken.verify(token_parts[1],Pub_KEY,{algorithms:['RS256']})
     // console.log(verificattion)}
     req.jwt = verificattion;
    
     if(req.jwt.iat < req.jwt.exp){
     next();}else{
      res.status(401).json({success:false,msg:'tokken expired'})
     }}
      catch(err){
        //console.log(err)
        res.status(401).json({success:false,msg:'You are anothorized!'})
      }
    }else{
      res.status(401).json({success:false,msg:'You are anothoprized!'})
    }
}catch(err){
    res.status(401).json({success:false,msg:'You are anothoprized!'})
}
  }
exports.exist= (req,res,next)=>{
    let mode  = req.body.mode ;
    console.log(req.body);
    if(mode){
    if(mode === 'Change_pass'){
       let email = req.body.login.user;
       let pass = req.body.login.pass;
       if(pass && email){
       const user =  get_user(email);
          if(user){
            if(vaildPass(pass,user.saltpw,user.hashpw)){//validation
                next();

           }
          else{
             res.status(401).json({msg:"Wrong Pass Access Denied !",success:false})
          }
        }
      }
      else{
        let msg = `Access Denied `;
        if(!pass){
          msg += `Password has not been given `
        }
        if(!email){
          msg += `User has not been given `
        }
        res.status(401).json({msg:msg,success:false})
       }

    }else if(mode === 'Register_user'){
      next();//non auth is required
    }
    else{
      res.status(400).json({msg:'non right mode options',success:false})
    }}else{
      res.status(400).json({msg:'Mode is not provided',success:false})
    }


}
function get_user(email){
  let critentials ;
  let fetchUser = new Promise ((resolve,reject)=>{
   models.users.findOne({where:{email:email}}).then((user)=>{
      critentials  = user.dataValues ;
      resolve();
    }).catch(err=>{
      res.status(400).json({err:err,status:"error"})
      resolve()
    })})
    Promise.all([fetchUser]).then(()=>{
      return critentials;
    })
}
exports.Criteria = (req,res,next) => {
   //:To do implement if  poll requires Criteria to view 
   next();
} 
exports.MineSurvey = (req,res,next) =>{
  let found = false;
  const id = req.params.id ; 
  const Creator = req.body.author; 
  if(id && Creator){
    //to Do user can try to authentivcate;
    let fetchapoll = new Promise((resolve,reject)=>{
        let poll;
        models.Polls.findByPk(id).then((mypoll)=>{
            poll = mypoll.dataValues ;
            found = true; 
            resolve();
        }).catch(err=>{
            res.status(400).json({err:err});
            reject();
        })
    })
    Promise.all[fetchapoll].then(()=>{
      if(found){
            if(poll.email === Creator ){
              next();
            }else{
              res.status(403).json({err:"you have not rigth to edit this Survey" })
            }
        }
    })
  }
  else{
    res.status(400).json({msg:"You are rquest has not a valid Format (id(poll_id):url param ,Creator(an email): body )"})
  }
}

exports.authuserForForgotpass= (req,res,next) =>{
  console.log(req.body)

  //let target_target_token = req.headers.authorization
 // console.log(target_target_token)
  try{
  //  console.log(req.headers)
  const token_parts = req.body.authorization;
  //console.log(token_parts[0])
   if(token_parts.match(/\S+\.\S+\.\S+/) !== null){
    //patern match 
    
    try{
    const  verificattion = jsonwebtoken.verify(token_parts,Pub_KEY2,{algorithms:['RS512']})
   // console.log(verificattion)}
   req.jwt = verificattion;
  
   if(req.jwt.iat < req.jwt.exp){
   next();}else{
    res.status(401).json({success:false,msg:'tokken expired'})
   }}
    catch(err){
      //console.log(err)
      res.status(401).json({success:false,msg:'You are anothorized!'})
    }
  }else{
    res.status(401).json({success:false,msg:'You are anothoprized!'})
  }
}catch(err){
  res.status(401).json({success:false,msg:'You are anothoprized!'})
}
}