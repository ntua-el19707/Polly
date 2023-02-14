const axios = require('axios');

const fs = require('fs');
const https = require('https');

const {readFileSync} =require('fs')

module.exports = function(o) {

    let pid=o.questionnaireID;
    //console.log(pid);

    let path_token= '../token.txt';
    let token = readFileSync(path_token,{encoding:'utf8',flag:'r'});

    //console.log(pid,sid);

    if (pid != undefined){

        let url='http://localhost:9103/inteliq_api/admin/getstats/'+pid;


        if(o.token==undefined){
            token="a";
        }

        axios
            .get(url, { headers: {"Authorization" : `Bearer ${token}`} })
            .then((res) => {
             console.log(res.data);
        })
    .catch((err) => console.log(err));
        
    
    }
    else {
    console.log("Give Correct Parameters");

    }
}