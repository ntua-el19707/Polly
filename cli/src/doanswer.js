const axios = require('axios');

const fs = require('fs');
const https = require('https');


module.exports = function(o) {

    let pid=o.questionnaireID;
    let qid=o.questionID;
    let sid=o.session;
    let aid=o.optionsID;


    //console.log(pid,qid,sid,aid);

    if (pid != undefined && qid != undefined && sid != undefined && aid != undefined){

        let url='http://localhost:9103/inteliq_api/doanswer/'+pid+'/'+qid+'/'+sid+'/'+aid

        axios
            .post(url)
            .then((res) => {
             console.log("okay");
        })
    .catch((err) => console.log(err));
    

   
    
    }
    else {
    console.log("Give Correct Parameters");

    }
}