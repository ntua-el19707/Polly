
const request = require('supertest');
const chai = require('chai')
const expect = chai.expect;
const app = require('../api-backend/app');
require('custom-env').env('localhost'); 

const valid_quesstionnaire_id = 2;

const invalid_quesstionnaire_id = 100;

const valid_session = "aaaa";

const invalid_session = "aa";


let response;

describe('Test getting session answers when questionnaire_id and session are valid (Post Request: {baseurl}/getsessionanswers/:questionnaireID/:session)', () => {
    it('Should return totals with status 200', (done) => {
        request(app)
        .get('/inteliq_api/getsessionanswers/' + valid_quesstionnaire_id + "/" + valid_session )
        .end((err, res) => {
            response = res.body;
            expect(res.status).to.eq(200);
            done()
        })
        })
});


describe('Test getting session answers when questionnaire_id is invalid (Post Request: {baseurl}/getsessionanswers/:questionnaireID/:session)', () => {
    it('Should return totals with status 400', (done) => {
        request(app)
        .get('/inteliq_api/getsessionanswers/' + invalid_quesstionnaire_id + "/" + valid_session )
        .end((err, res) => {
            response = res.body;
            expect(res.status).to.eq(400);
            done()
        })
        })
});


describe('Test getting session answers when session is invalid (Post Request: {baseurl}/getsessionanswers/:questionnaireID/:session)', () => {
    it('Should return totals with status 400', (done) => {
        request(app)
        .get('/inteliq_api/getsessionanswers/' + valid_quesstionnaire_id + "/" + invalid_session )
        .end((err, res) => {
            response = res.body;
            expect(res.status).to.eq(400);
            done()
        })
        })
});
