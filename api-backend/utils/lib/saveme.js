const chalk = require('chalk')
const {writeFileSync} =  require('fs')
const { patch } = require('../../routes/api/Answer/questionnaire')
const path = './save'
function saveme(json,filename){
    return new Promise((resolve,reject)=>{
    console.log(chalk.green('here'))
   // console.log(json) 
    let txt  =`
    {
           questionnaireID:,
           questionnaireTitle: '${json.questionnaireTitle}',
           keywords:${json.keywords}
           questions: [
             
    `
    json.questions.forEach(q => {
        txt += `{
                      qID: '${q.qID}',
                      qtext: '${q.qtext}',
                      required: '${q.required}',
                      type: '${q.type}',
                      options: [`
         q.options.forEach(o=>{
             txt += `
             {
                nextqID:'${o.nextqID}', 
                optID'${o.optID}',
                opttxt:'${o.opttxt}' 
             },
             `
         })
         txt += '] },';   
         
    });
    txt += ` ] }
    `
    const Filepath = `${filename}.txt`;
    console.log(chalk.red('end'))
    writeFileSync(`${filename}.txt`,txt);
    resolve()
})
}
module.exports = {saveme}