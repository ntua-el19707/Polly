const axios = require('axios');

const fs = require('fs');
const https = require('https');


module.exports = function(o) {

    let pid=o.questionnaireID;
    let format=o.formatID;


   // console.log(pid);

    if (pid != undefined){

        let url='http://localhost:9103/inteliq_api/questionnaire2/'+pid;


        if(format!=undefined){
            url=url+'?format='+format;
        }

        
        axios
            .get(url)
            .then((res) => {
                let ans=res.data;
             console.log(ans.rsp);
        })
    .catch((err) => console.log(err));
        
    
    }
    else {
        console.log("Give Correct Parameters");
    
        }

}