const axios = require('axios');

const fs = require('fs');
const https = require('https');


module.exports = function(o) {

    let pid=o.questionnaireID;
    console.log(pid);

    if (pid != undefined){


    let token;

    if(o.token==undefined){
        token="a";
    }
    else
        token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ2aWN0b3IwNjAxQGxpdmUuY29tIiwiaWF0IjoxNjc2MTM0NTg3MDM3LCJleHAiOjE2NzYxMzQ2NzM0Mzd9.rfudVF5_mylZ-Q6lzanlujelVwlbA0EsMLFxb9vluKFc0omJtXsbm1HKCa-qxMqBfT_qbryDdPJ8kGC7qkx-yqOE_5OK0Jaz8WNXX8TdDRSvPYkg8WfyECTTaMT2hDRuBQ1VNFNo44CAxbJLdrfxee-VrioqEBWbThMhJ6AW98VWQTEPpPy60jjrL-zXPkXH5Orv-FEkJl8kte2JQqwsNl5fRlN3R4U8bm38yu7rnnmtbqgv9ugglqC0aFo2hMGdHgS5kj4gmSe-qLmYbR-UE3Ig_7T71f7cl2PDpKXmf823Hu7-tHOfiO01rhJtYtBzUdkVrjPeaYK-7W_tgSNmENnQGip2BOAsTEolXopR7kzHueZF5oIo-9-ErNy8ZDibRa2Pwpa9Fh3fKpvWJdZtRAiJarmWHZqKLtsdKg_EkLo87Zw72Buwr-ZnXXKYuFQdElCBxwx6PAPGCP4IcpOdPOlwDQI8ktSY_c9IzTZz9Ky_y0Sb9M_0duL72J9RldISSdpnM5hQ1_5DW9s5yN18F48ADzZisRUzEvbV8ksxhJ2VCFy8GHamyloyNkmWb5d3IVgOq271FDDMiMON0jmhqOwig3bvhC4twwPaoFC3Q-gKOzo3ZIpo-YAfMvf-zGVddi3STTsUiCb4OkQdGWBcXf5bZjpoAkz2-tfe6iz3gVU";
    
        let url='http://localhost:9103/inteliq_api/admin/resetq/'+pid;


        axios
            .delete(url, { headers: {"Authorization" : `Bearer ${token}`} })
            .then((res) => {
             console.log(res.data);
        })
    .catch((err) => console.log(err));

    }

    else {
        console.log("Give Correct Parameters");
    
        }
        
    
    

}