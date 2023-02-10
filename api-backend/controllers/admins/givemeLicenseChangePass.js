const { auth } = require("../../utils/authuser");
const { issueJWTForgot } = require("../../utils/StringGen");

exports.requestChangePass = (req,res,next) =>{
    const pass =  req.params.pass ;
    if(!req.jwt){
        res.status(401).json({err:'you Shall not Access here'});
    }else{
    const user = req.jwt.sub;
    if(user){
        auth(user,pass).then((rsp)=>{
            if(rsp){
                let tokkenLink = issueJWTForgot(user,'20m',process.env.ResetKey);
                res.status(200).json({tokkenLink:tokkenLink});
            }else{
                res.status(401).json({err:'password do not match'});
            }
        }).catch(err =>{
            console.log(err)
            res.status(400).json({err:err});
        })
    }
    else{
        res.status(401).json({err:'you Shall not Access here'});
    }
    
    }


}