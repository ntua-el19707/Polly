const request = require('supertest');
const chai = require('chai')
const expect = chai.expect;
const app = require('../api-backend/app');
//const { JsonWebTokenError } = require('jsonwebtoken');
require('custom-env').env('localhost'); 

const owner = {
    "user": "victor0601@live.com",
    "pass": "12"
}
const validbody = {
    Login:owner
}
const ownerWrongPass = {
    "yser": "victor0601@live.com",
    "password": "12345abc"    
}
const invalidbody = {
    Login:ownerWrongPass
}



let response;

describe('Test reset all when user is not authorized (Delete Request: {baseurl}//inteliq_api/admin/resetq/questionnaireID)', () => {
    it('Should Login with status 401', (done) => {
        request(app)
        .post('/inteliq_api/login')
        .send(invalidbody)
        .end((err, res) => {
           //let token = res.body.user.token;
          // let token="yJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtYWRhcmFAcm9vdC5jb20iLCJpYXQiOjE2NzYwNDIyMjU0NjUsImV4cCI6MTY3NjA0MjMxMTg2NX0.HcqNTMzber2C5ZBu7Z482svq6BcZQuHRJqOMHJJU1gNNtHL36Qh3B_T60Uw9mtRLRQ7PXNmQtAGt0do8U9P3NPSHbdv4HV7NMArOFtILRB-xZF1SLzKEEwq3lCoZMKkfM4c02iacSqXBQFUIiCD5wQ-a0Q-gi-Jv1PWkt1nnC0OJfcECXgpyE60yRCd94xgcDx_xEKu8V8WxvtQuI3AoONjGJQdAQrT-5i50WmAVAjg4Le-RGJgqqCmYMkflfshU441MVOC7fuxUGS7MUFaGWE9TQpndv-CQU_Wy3yihHhLIn3_X4aFCqyAdR2p6J0Et-O-nVI_yL7hwmVYy-raWv0EPUahT_cAKicO1xiDDNGGVpuCv-HtDHjjb7mfTjqbMxotBhnQhyqjLJ56Wt2lHk-E7ZOMOxv6prnk32m5Jjy0hqGz6v2WcQUUlOz1EV1JdJA2KsRI0GLP99DTVTkKhUNuFlJlDAKROsebEMd5vMJoSX7czaBd8qykpVLoOf9TKAFjdOWBEBlSfn7xKbVtxs7Pr4rlGo5HjM9jxa-3SrzXo2NrvwAKUQIvxtPZ8CK1lPXCvttKVeUCuhprW7yCdGUhM5J3lj1eBRKlSEcNFTdPIPHQbbB0b0RXcfdcn59jY1DCyu7lBqceBlzv6E126ZxWNBODXwWzZWfa1XsfSRoE"
            /*
          let token=res.body.user.token;
          let token2=null;
         for(let i=7;i<token.length;i++){
          if(token2==null){
              token2=token[i];
          }
          else
          token2=token2+token[i];
         }
         */
        let token="a";

           let url='/inteliq_api/admin/resetall';
           console.log(url);
            request(app)
            .delete(url)
            .set("Authorization", `Bearer ${token}`)
            .end((err, res) => {
                response = res.body;
                
                expect(res.status).to.eq(401);
                done()
            })

    
        })
    })
    
})


describe('Test reset all when user is authorized (Delete Request: {baseurl}//inteliq_api/admin/resetall', () => {
    it('Should Login with status 200', (done) => {
        request(app)
        .post('/inteliq_api/login')
        .send(validbody)
        .end((err, res) => {
           //let token = res.body.user.token;
          // let token="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtYWRhcmFAcm9vdC5jb20iLCJpYXQiOjE2NzYwNDIyMjU0NjUsImV4cCI6MTY3NjA0MjMxMTg2NX0.HcqNTMzber2C5ZBu7Z482svq6BcZQuHRJqOMHJJU1gNNtHL36Qh3B_T60Uw9mtRLRQ7PXNmQtAGt0do8U9P3NPSHbdv4HV7NMArOFtILRB-xZF1SLzKEEwq3lCoZMKkfM4c02iacSqXBQFUIiCD5wQ-a0Q-gi-Jv1PWkt1nnC0OJfcECXgpyE60yRCd94xgcDx_xEKu8V8WxvtQuI3AoONjGJQdAQrT-5i50WmAVAjg4Le-RGJgqqCmYMkflfshU441MVOC7fuxUGS7MUFaGWE9TQpndv-CQU_Wy3yihHhLIn3_X4aFCqyAdR2p6J0Et-O-nVI_yL7hwmVYy-raWv0EPUahT_cAKicO1xiDDNGGVpuCv-HtDHjjb7mfTjqbMxotBhnQhyqjLJ56Wt2lHk-E7ZOMOxv6prnk32m5Jjy0hqGz6v2WcQUUlOz1EV1JdJA2KsRI0GLP99DTVTkKhUNuFlJlDAKROsebEMd5vMJoSX7czaBd8qykpVLoOf9TKAFjdOWBEBlSfn7xKbVtxs7Pr4rlGo5HjM9jxa-3SrzXo2NrvwAKUQIvxtPZ8CK1lPXCvttKVeUCuhprW7yCdGUhM5J3lj1eBRKlSEcNFTdPIPHQbbB0b0RXcfdcn59jY1DCyu7lBqceBlzv6E126ZxWNBODXwWzZWfa1XsfSRoE"

          let token=res.body.user.token;
            let token2=null;
           for(let i=7;i<token.length;i++){
            if(token2==null){
                token2=token[i];
            }
            else
            token2=token2+token[i];
           }

           let url='/inteliq_api/admin/resetall';
           
            request(app)
            .delete(url)
            .set("Authorization", `Bearer ${token2}`)
            .end((err, res) => {
                response = res.body;
                
                expect(res.status).to.eq(200);
                done()
            })

    
        })
    })
    
})



