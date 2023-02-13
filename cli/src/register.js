const axios = require('axios');
const fs = require('fs');
const https = require('https');


module.exports = function(o) {

  
    let user=o.username;
    let pass1=o.password1;
    let pass2=o.password2;

    //let change=o.changepass;
    let registeruser=o.registeruser;
    let register;
    let mode;
    let flag=0;

    if (user != undefined && pass1 != undefined && pass2 != undefined){

        /*
        if((change==undefined)&&(registeruser!=undefined)){
            mode="Register_user";
            register= {
            user:user,
            pass1:pass1,
            pass2:pass2}
        }
        
        else
            if((change!=undefined)&&(registeruser==undefined)){
                mode="Change_pass";
                register= {
                    user:user,
                    pass1:pass1,
                    pass2:pass2}
            }
        else{
            mode="Wrong!";
            flag=1;
            console.log("Give -c for Change Password or -r for Register new User");
        }
        */

        if(registeruser==undefined){
            mode="Wrong!";
            flag=1;
            console.log("Give -r for Registering new User");
        }


        else {

            mode="Register_user";
            register= {
            user:user,
            pass1:pass1,
            pass2:pass2}

            
       // console.log(mode);
       // console.log(register);


        let url='http://localhost:9103/inteliq_api/admin/usermod';


        axios
            .post(url,{ 
                "register":register,
                "mode":mode
            })
            .then((res) => {
             console.log(res);
        })
    .catch((err) => console.log(err));
        }
        
    
    }
    else {
        console.log("Give username and 2 passwords");
    
        }

}