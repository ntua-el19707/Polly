const sequelize = require('../../utils/database');
const  initModels = require("../../models/init-models");
const { ChangeUser,MypollsCount,getMyInfo } = require('../../utils/authuser');
exports.getInfo = (req,res,next)=>{
    const user = req.jwt.sub ; 
    Promise.all([getMyInfo(user),MypollsCount(user) ]).then((rsp)=>{
        const rsptoSend ={
            fullName:rsp[0].fullName,
            user:user,
            total:rsp[1]
        }

        res.status(200).json(rsptoSend);
    }).catch(err=>{
        console.log(err)
        res.status(400).json({err:err})
    })
    

}

exports.putUser = (req,res,next)=>{
    const user = req.jwt.sub ;
    const fullName = req.body.fullName 
    const newUsername = req.body.username; 
    console.log(fullName,newUsername)
    ChangeUser(fullName,newUsername,user).then(()=>{
        res.status(200).json({msg:'ok'})
    }).catch(err=>{
        console.log(err)
        res.status(400).json({err:err});
    })
    
}