const crypto = require('crypto') ;
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const pathToKey = path.join(__dirname, '../config/keys', 'private.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

const pathToPKey = path.join(__dirname, '../config/keys', 'public.pem');
const Pub_KEY = fs.readFileSync(pathToPKey, 'utf8');
exports.genpass = (pass) =>{
    const salt  = crypto.randomBytes(parseInt(process.env.Salt_size)).toString('HEX')
    const hash =  hash_pass(pass,salt);
    return {
        salt:salt,
        hash:hash
    }
}
exports.vaildPass = (pass,salt,hash) =>{
    console.log(pass)
    const hash_new = hash_pass(pass,salt);

    if(hash_new === hash)
    {
        return true ;//passwords  matches
    }
    return false ;
}
exports.generateSessions = () =>{
    return  crypto.randomBytes(parseInt(process.env.Session_size)).toString('HEX');
}
function hash_pass(pass,salt){
    return crypto.pbkdf2Sync(pass,salt ,parseInt(process.env.Encrypt_iterations),parseInt(process.env.Hash_size),process.env.SH_Encypt).toString('hex')
} 
exports.issueJWT = (user) =>{
    const _id = user.email;
  
    const expiresIn = '1d';
  
    const payload = {
      sub: _id,
      iat: Date.now()
    };
  
    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });
  
    return {
      token: "Bearer " + signedToken,
      expires: expiresIn
    }
  }