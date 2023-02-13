const axios = require('axios');

const fs = require('fs');
const https = require('https');


module.exports = function(o) {

    console.log("h");
    let user=o.username;
    let pass=o.password;


   

    if (user != undefined && pass != undefined){

        let url='http://localhost:9103/inteliq_api/login';


        axios
            .post(url,{ "Login":{
                "user":user,
                "pass":pass
            }})
            .then((res) => {
             console.log(res);
        })
    .catch((err) => console.log(err));
        
    
    }
    else {
        console.log("Give Correct Parameters");
    
        }

}