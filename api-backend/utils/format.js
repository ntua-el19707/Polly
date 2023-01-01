exports.questionarieFormat = (questions) =>{
let res = true;
  questions.forEach(el =>{
    if(this.validateRow(el)){
        if(this.validateRowspec(el)){
           
        }
        else{
            console.log(el)
            console.log(1)
            res =false;
        }
    }
    else{
        console.log(2)
        res = false;
    }
  })
  return res;
}
exports.validateRow = (row) =>{
    if(row.qID && row.qtext && row.required && row.type && row.options){
        return true; 
    }
    return false;
}
exports.validateRowspec = (row)=>{
    if(this.validateqId(row.qID)){
        if((row.required === 'FALSE' || row.required === 'TRUE') && (row.type === "profile"||row.type==="question") &&(this.validateOptions(row.options))){
            return true;
        }
    }
    return false; 
}
exports.validateAid = (aid)=>{
    let split = aid.split('Q');
    if(split[1]){
        if(aid[0] === 'Q'){
            let split2 = split[1].split('A');
            if(split2[1]){
                if(!isNaN(split2[0])&& !isNaN(split2[1]) && parseInt(split2[0])<=99 && parseInt(split2[1])<=9){
                    return true;
                }
            }
            else{
                  let split3 = split2[0].split('TXT');
                 // console.log(split3)
                    if(split2[0].includes('TXT')&& !isNaN(split3[0])){
                        return true
                    }
                
            }
            

        }
    }
    return false;
}
exports.validatenextqid = (qid)=>{
    if(this.validateqId(qid) || qid === '-'){
        return true ;
    }
    return false;
}
exports.validateOptions = (options) =>{
    let res = true; 
    options.forEach(el =>{
        if(!this.validateAid(el.optID) || !this.validatenextqid(el.nextqID)){
            res = false ;
        }
    })
    return res;
}
exports.getqid = (qid) =>{
    if(this.validateqId(qid)){
        return (qid.split('Q'))[1];
    }else{
        return '-1';
    }
}
exports.validateqId  = (qID) =>{
    let split = qID.split('Q');
    if(split[1]){
    //console.log(isNaN(split[1]));
    let x = parseInt( split[1]) ;
   // console.log(x)
    if(qID[0] === 'Q' &&  !isNaN(split[1])  && x<=99){
        return true ;
    }
     }
     return false;
}
/*
"qID": "Q00",
 "qtext": "Ποιο είναι το mail σας;",
 "required": "FALSE",
 "type": "profile",
 "options": [
 {
 "optID": "P00TXT",
 "opttxt": "<open string>",
 "nextqID": "Q01"
 }
*/