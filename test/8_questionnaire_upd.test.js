
const request = require('supertest');
const chai = require('chai')
const expect = chai.expect;
const app = require('../api-backend/app');
//const { JsonWebTokenError } = require('jsonwebtoken');
require('custom-env').env('localhost'); 

const valid_quesstionnaire_id = 2;

const invalid_quesstionnaire_id = 100;


const owner = {
    "user": "madara@root.com",
    "pass": "12"
}
const validbody = {
    Login:owner
}
const ownerWrongPass = {
    "yser": "madara@root.com",
    "password": "123"    
}
const invalidbody = {
    Login:ownerWrongPass
}



let response;


let correctq = {
    "questionnaireID": "QQ000",
    "questionnaireTitle": "My first research questionnaire",
    "keywords": [
    "footbal",
    "islands",
    "timezone"
    ],"user":"madara@root.com",
    "questions": [
    {
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
    ]
    },
    {
    "qID": "Q01",
    "qtext": "Ποια είναι η ηλικία σας;",
    "required": "TRUE",
    "type": "profile",
    "options": [
    {
    "optID": "P01A1",
    "opttxt": "<30",
    "nextqID": "Q02"
    },
    {
    "optID": "P01A2",
    "opttxt": "30-50",
    "nextqID": "Q02"
    },
    {
    "optID": "P01A3",
    "opttxt": "50-70",
    "nextqID": "Q02"
    },
    {
    "optID": "P01A4",
    "opttxt": ">70",
    "nextqID": "Q02"
    }
    ]
    },
    {
    "qID": "Q02",
    "qtext": "Ποιο είναι το αγαπημένο σας χρώμα;",
    "required": "TRUE",
    "type": "question",
    "options": [
    {
    "optID": "Q02A1",
    "opttxt": "Πράσινο",
   
    "nextqID": "Q03"
    },
   
   {
    "optID": "Q02A2"
   ,
    "opttxt":"Κόκκινο"
   ,
    "nextqID": "Q03"
    },
   
   {
    "optID": "Q01A3"
   ,
    "opttxt":
   "Κίτρινο"
   ,
    "nextqID": "Q03"
   
   }
   
   ]
    },
   
   {
    "qID": "Q03"
   ,
    "qtext":
   "Ασχολείστε με το ποδόσφαιρο;"
   ,
    "required": "TRUE"
   ,
    "type": "question"
   ,
    "options": [
   
   {
    "optID": "Q03A1"
   ,
    "opttxt":"Ναι",
    "nextqID": "Q04"
    },
   
   {
    "optID": "Q03A2"
   ,
    "opttxt":
   "Οχι"
   ,
    "nextqID": "Q05"
   
   }
   
   ]
    },
   
   {
    "qID": "Q04"
   ,
    "qtext":
   "Τι ομάδα είστε;"
   ,
    "required": "TRUE"
   ,
    "type": "question"
   ,
    "options": [
   
   {
    "optID": "Q04A1"
   ,
    "opttxt":"Παναθηναϊκός"
   ,
    "nextqID": "Q05"
    },
   
   {
    "optID": "Q04A2"
   ,
    "opttxt":
   "Ολυμπιακός "
   ,
    "nextqID": "Q05"
    },
   
   {
    "optID": "Q04A3"
   ,
    "opttxt":
   "ΑΕΚ"
   ,
    "nextqID": "Q05"
   
   }
   
   ]
    },
   
   {
    "qID": "Q05"
   ,
    "qtext":
   "Έχετε ζήσει σε νησί;"
   ,
    "required": "TRUE"
   ,
    "type": "question"
   ,
    "options": [
   
   {
    "optID": "Q05A1"
   ,
    "opttxt":
   "Ναι"
   ,
    "nextqID": "Q06"
    },
   
    {
    "optID": "Q04A2",
    "opttxt": "Οχι",
    "nextqID": "Q07"
    }
    ]
    },
    {
    "qID": "Q06",
    "qtext": "Με δεδομένο ότι απαντήσατε [*Q04A1] στην ερώτηση [*Q04]: Ποια ησχέση σας με το θαλάσσιο σκι;",
    "required": "TRUE",
    "type": "question",
    "options": [
    {
    "optID": "Q06A1",
    "opttxt": "Καμία",
    "nextqID": "Q08"
    },
    {
    "optID": "Q06A2",
    "opttxt": "Μικρή",
    "nextqID": "Q08"
    },
    {
    "optID": "Q06A3",
    "opttxt": "Μεγάλη",
    "nextqID": "Q08"
    }
    ]
    },
    {
    "qID": "Q07",
    "qtext": "Είστε χειμερινός κολυμβητής",
    "required": "TRUE",
    "type": "question",
    "options": [
    {
    "optID": "Q07A1",
    "opttxt": "Ναι",
    "nextqID": "Q08"
    },
    {
    "optID": "Q07A2",
    "opttxt": "Οχι",
    "nextqID": "Q08"
    }
    ]
    },
    {
    "qID": "Q08",
    "qtext": "Κάνετε χειμερινό σκι;",
    "required": "TRUE",
    "type": "question",
    "options": [
    {
    "optID": "Q08A1",
    "opttxt": "Σπάνια - καθόλου",
    "nextqID": "Q09"
    },
    {
    "optID": "Q08A2",
    "opttxt": "Περιστασιακά",
    "nextqID": "Q09"
    },
    {
    "optID": "Q08A3",
    "opttxt": "Τακτικά",
    "nextqID": "Q09"
    }
    ]
    },
    {
    "qID": "Q09",
    "qtext": "Συμφωνείτε να αλλάζει η ώρα κάθε χρόνο;",
    "required": "TRUE",
    "type": "question",
    "options": [
    {
    "optID": "Q09A1",
    "opttxt": "Ναι",
    "nextqID": "Q10"
    },
    {
    "optID": "Q09A2",
    "opttxt": "Οχι",
    "nextqID": "-"
    }
    ]
    },
    {
    "qID": "Q10",
    "qtext": "Με δεδομένο ότι απαντήσατε [*Q08A2] στην ερώτηση [*Q08]: Προτιμάτετη θερινή ή την χειμερινή ώρα;",
    "required": "TRUE",
    "type": "question",
    "options": [
    {
    "optID": "Q09A1",
    "opttxt": "Θερινή",
    "nextqID": "-"
    },
    {
    "optID": "Q09A2",
    "opttxt": "Χειμερινή",
    "nextqID": "-"
    }
    ]
    }
    ]
   }

let incorrectq = {"a": "a"}

describe('Test reset q when Questionnaire has a correct form (Delete Request: {baseurl}//inteliq_api/admin/questionnaire_upd)', () => {
    it('Should Login with status 200', (done) => {
        request(app)
        .post('/inteliq_api/login')
        .send(validbody)
        .end((err, res) => {
           //let token = res.body.user.token;
           let token="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtYWRhcmFAcm9vdC5jb20iLCJpYXQiOjE2NzYwNDIyMjU0NjUsImV4cCI6MTY3NjA0MjMxMTg2NX0.HcqNTMzber2C5ZBu7Z482svq6BcZQuHRJqOMHJJU1gNNtHL36Qh3B_T60Uw9mtRLRQ7PXNmQtAGt0do8U9P3NPSHbdv4HV7NMArOFtILRB-xZF1SLzKEEwq3lCoZMKkfM4c02iacSqXBQFUIiCD5wQ-a0Q-gi-Jv1PWkt1nnC0OJfcECXgpyE60yRCd94xgcDx_xEKu8V8WxvtQuI3AoONjGJQdAQrT-5i50WmAVAjg4Le-RGJgqqCmYMkflfshU441MVOC7fuxUGS7MUFaGWE9TQpndv-CQU_Wy3yihHhLIn3_X4aFCqyAdR2p6J0Et-O-nVI_yL7hwmVYy-raWv0EPUahT_cAKicO1xiDDNGGVpuCv-HtDHjjb7mfTjqbMxotBhnQhyqjLJ56Wt2lHk-E7ZOMOxv6prnk32m5Jjy0hqGz6v2WcQUUlOz1EV1JdJA2KsRI0GLP99DTVTkKhUNuFlJlDAKROsebEMd5vMJoSX7czaBd8qykpVLoOf9TKAFjdOWBEBlSfn7xKbVtxs7Pr4rlGo5HjM9jxa-3SrzXo2NrvwAKUQIvxtPZ8CK1lPXCvttKVeUCuhprW7yCdGUhM5J3lj1eBRKlSEcNFTdPIPHQbbB0b0RXcfdcn59jY1DCyu7lBqceBlzv6E126ZxWNBODXwWzZWfa1XsfSRoE"


           let url='/inteliq_api/admin/questionnaire_upd'
           console.log(url);
            request(app)
            .post(url)
            .set("Authorization", `Bearer ${token}`)
            .send(correctq)
            .end((err, res) => {
                response = res.body;
                
                expect(res.status).to.eq(200);
                done()
            })

    
        })
    })
    
});

describe('Test reset q when Questionnaire does not have a correct form (Delete Request: {baseurl}//inteliq_api/admin/questionnaire_upd)', () => {
    it('Should Login with status 400', (done) => {
        request(app)
        .post('/inteliq_api/login')
        .send(validbody)
        .end((err, res) => {
           //let token = res.body.user.token;
           let token="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtYWRhcmFAcm9vdC5jb20iLCJpYXQiOjE2NzYwNDIyMjU0NjUsImV4cCI6MTY3NjA0MjMxMTg2NX0.HcqNTMzber2C5ZBu7Z482svq6BcZQuHRJqOMHJJU1gNNtHL36Qh3B_T60Uw9mtRLRQ7PXNmQtAGt0do8U9P3NPSHbdv4HV7NMArOFtILRB-xZF1SLzKEEwq3lCoZMKkfM4c02iacSqXBQFUIiCD5wQ-a0Q-gi-Jv1PWkt1nnC0OJfcECXgpyE60yRCd94xgcDx_xEKu8V8WxvtQuI3AoONjGJQdAQrT-5i50WmAVAjg4Le-RGJgqqCmYMkflfshU441MVOC7fuxUGS7MUFaGWE9TQpndv-CQU_Wy3yihHhLIn3_X4aFCqyAdR2p6J0Et-O-nVI_yL7hwmVYy-raWv0EPUahT_cAKicO1xiDDNGGVpuCv-HtDHjjb7mfTjqbMxotBhnQhyqjLJ56Wt2lHk-E7ZOMOxv6prnk32m5Jjy0hqGz6v2WcQUUlOz1EV1JdJA2KsRI0GLP99DTVTkKhUNuFlJlDAKROsebEMd5vMJoSX7czaBd8qykpVLoOf9TKAFjdOWBEBlSfn7xKbVtxs7Pr4rlGo5HjM9jxa-3SrzXo2NrvwAKUQIvxtPZ8CK1lPXCvttKVeUCuhprW7yCdGUhM5J3lj1eBRKlSEcNFTdPIPHQbbB0b0RXcfdcn59jY1DCyu7lBqceBlzv6E126ZxWNBODXwWzZWfa1XsfSRoE"


           let url='/inteliq_api/admin/questionnaire_upd'
           console.log(url);
            request(app)
            .post(url)
            .set("Authorization", `Bearer ${token}`)
            .send(incorrectq)
            .end((err, res) => {
                response = res.body;
                
                expect(res.status).to.eq(400);
                done()
            })

    
        })
    })
    
});