const request = require('supertest');
const chai = require('chai')
const expect = chai.expect;
const app = require('../api-backend/app');
const fs = require('fs');
const https = require('https');

const {readFileSync} =require('fs')
//const { JsonWebTokenError } = require('jsonwebtoken');
require('custom-env').env('localhost'); 



const valid_quesstionnaire_id = 2;

const invalid_quesstionnaire_id = 100;


const owner = {
    "user": "aa",
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



describe('Test reset q when QuestionnaireID is valid (Delete Request: {baseurl}//inteliq_api/admin/resetq/questionnaireID)', () => {
    it('Should Login with status 200', (done) => {
        request(app)
        .post('/inteliq_api/login')
        .send(validbody)
        .end((err, res) => {

            let token=res.body.user.token;
            let token2=null;
           for(let i=7;i<token.length;i++){
            if(token2==null){
                token2=token[i];
            }
            else
            token2=token2+token[i];
           }
           //let token = res.body.user.token;
           //let token="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtYWRhcmFAcm9vdC5jb20iLCJpYXQiOjE2NzYwNDIyMjU0NjUsImV4cCI6MTY3NjA0MjMxMTg2NX0.HcqNTMzber2C5ZBu7Z482svq6BcZQuHRJqOMHJJU1gNNtHL36Qh3B_T60Uw9mtRLRQ7PXNmQtAGt0do8U9P3NPSHbdv4HV7NMArOFtILRB-xZF1SLzKEEwq3lCoZMKkfM4c02iacSqXBQFUIiCD5wQ-a0Q-gi-Jv1PWkt1nnC0OJfcECXgpyE60yRCd94xgcDx_xEKu8V8WxvtQuI3AoONjGJQdAQrT-5i50WmAVAjg4Le-RGJgqqCmYMkflfshU441MVOC7fuxUGS7MUFaGWE9TQpndv-CQU_Wy3yihHhLIn3_X4aFCqyAdR2p6J0Et-O-nVI_yL7hwmVYy-raWv0EPUahT_cAKicO1xiDDNGGVpuCv-HtDHjjb7mfTjqbMxotBhnQhyqjLJ56Wt2lHk-E7ZOMOxv6prnk32m5Jjy0hqGz6v2WcQUUlOz1EV1JdJA2KsRI0GLP99DTVTkKhUNuFlJlDAKROsebEMd5vMJoSX7czaBd8qykpVLoOf9TKAFjdOWBEBlSfn7xKbVtxs7Pr4rlGo5HjM9jxa-3SrzXo2NrvwAKUQIvxtPZ8CK1lPXCvttKVeUCuhprW7yCdGUhM5J3lj1eBRKlSEcNFTdPIPHQbbB0b0RXcfdcn59jY1DCyu7lBqceBlzv6E126ZxWNBODXwWzZWfa1XsfSRoE"
           // let token="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYSIsImlhdCI6MTY3NjQ3MDk0MzMxMiwiZXhwIjoxNjc2NDcxMDI5NzEyfQ.FR78S0ovvrgDNUyrrWxoD8-rSE7uHZwYe6rnqheOlG0FPyVNtO7TU1P2mH43m3_ujygTSu-LPfzwNEZuRCcQylmYWSfxlFLLvrBJrz_ng1456ElDG4G5nD-XKwMX6tLW7R3uzFjt1x7WVg_PzUoSs1l23rX5t_oBuEzHhnO9YnFYbuBcy7EhyvXC0qG_1TmILujHIDErajUll8MJYiSEM7_7ZOAdbu68ZZTR8NcnIWvGVmQgXIfEq2UFIkDnwGM_rdl3vo9JDP_9p-XNdrzqeH2htO6gfX7JolOTXBQZPLc5wkA3Hla8kN7gTvFi_utlNOHsHa20nWaGnyMmmlWF-l37HBRQpn87m9s0D3OwuzaMSzYEqW7s3c3QoXMEqlgdrFvhY5AeADDSjd2P9q7BgUYJOA1hDFrl1_8TU3V6LWSlr3Dts4c0rxQ8OAtFI0FPsfakTqZkaJqrZrtXaqElwR5dJTPIXeYYhuyVGP2CwtwJlzJ3ZzSH6FNewUjY5IrCPNWd3ucfj27gzaCYW4VSWLokFjDMGfUNz05Q0pybeKhoSSPmjv4Lryu9VxKZOx12hR2dBZ7VBsHYQG53DbDMa3TdLX3Mc93oxiI4OlazbDI_E8pjvh-C2vHkC1lLHnXjvFXoBv9Ol8Ls1u6wU4hZgs1SvAh83WbP3_qQIhm6PlQ"
           //let path_token= '../test/token.txt';
           // let token = readFileSync(path_token,{encoding:'utf8',flag:'r'});

           let url='/inteliq_api/admin/resetq/' + valid_quesstionnaire_id;
           console.log(url);
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

    
});


/*
describe('Test reset q when QuestionnaireID is valid but user is not authorized (Delete Request: {baseurl}//inteliq_api/admin/resetq/questionnaireID)', () => {
    it('Should Login with status 401', (done) => {
        request(app)
        .post('/inteliq_api/login')
        .send(invalidbody)
        .end((err, res) => {
           //let token = res.body.user.token;
           let token="yJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtYWRhcmFAcm9vdC5jb20iLCJpYXQiOjE2NzYwNDIyMjU0NjUsImV4cCI6MTY3NjA0MjMxMTg2NX0.HcqNTMzber2C5ZBu7Z482svq6BcZQuHRJqOMHJJU1gNNtHL36Qh3B_T60Uw9mtRLRQ7PXNmQtAGt0do8U9P3NPSHbdv4HV7NMArOFtILRB-xZF1SLzKEEwq3lCoZMKkfM4c02iacSqXBQFUIiCD5wQ-a0Q-gi-Jv1PWkt1nnC0OJfcECXgpyE60yRCd94xgcDx_xEKu8V8WxvtQuI3AoONjGJQdAQrT-5i50WmAVAjg4Le-RGJgqqCmYMkflfshU441MVOC7fuxUGS7MUFaGWE9TQpndv-CQU_Wy3yihHhLIn3_X4aFCqyAdR2p6J0Et-O-nVI_yL7hwmVYy-raWv0EPUahT_cAKicO1xiDDNGGVpuCv-HtDHjjb7mfTjqbMxotBhnQhyqjLJ56Wt2lHk-E7ZOMOxv6prnk32m5Jjy0hqGz6v2WcQUUlOz1EV1JdJA2KsRI0GLP99DTVTkKhUNuFlJlDAKROsebEMd5vMJoSX7czaBd8qykpVLoOf9TKAFjdOWBEBlSfn7xKbVtxs7Pr4rlGo5HjM9jxa-3SrzXo2NrvwAKUQIvxtPZ8CK1lPXCvttKVeUCuhprW7yCdGUhM5J3lj1eBRKlSEcNFTdPIPHQbbB0b0RXcfdcn59jY1DCyu7lBqceBlzv6E126ZxWNBODXwWzZWfa1XsfSRoE"


           let url='/inteliq_api/admin/resetq/' + valid_quesstionnaire_id;
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
    
});

*/