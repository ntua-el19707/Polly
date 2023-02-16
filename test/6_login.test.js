

const request = require('supertest');
const chai = require('chai')
const expect = chai.expect;
const app = require('../api-backend/app');
require('custom-env').env('localhost'); 

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

let token;
let response;
describe('Test login route as Owner (Post Request: {baseurl}/login)', () => {
    it('Should Login with status 200', (done) => {
        request(app)
        .post('/inteliq_api/login')
        .send(validbody)
        .end((err, res) => {
            token = res.body.user.token;
           // response = res.body;
           console.log(res);
            expect(res.status).to.eq(200);
            done()
        })
    })
    
});



describe('Test login route as Owner (Post Request: {baseurl}/login)', () => {
    it('Should Login with status 401', (done) => {
        request(app)
        .post('/inteliq_api/login')
        .send(invalidbody)
        .end((err, res) => {
           // token = res.body.token;
            response = res.body;
            expect(res.status).to.eq(401);
            done()
        })
    })
    
});

