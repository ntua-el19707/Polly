
const request = require('supertest');
const chai = require('chai')
const expect = chai.expect;
const app = require('../api-backend/app');
require('custom-env').env('localhost'); 

const valid_quesstionnaire_id = 1;

const invalid_quesstionnaire_id = 100;

const valid_question_id = 4;

const invalid_question_id = 500;


let response;

describe('Test getting question answers when questionnaire_id and question_id are valid (Post Request: {baseurl}/getquestionanswers/:questionnaireID/:questionID)', () => {
    it('Should return totals with status 200', (done) => {
        request(app)
        .get('/inteliq_api/getquestionanswers/' + valid_quesstionnaire_id + "/" + valid_question_id )
        .end((err, res) => {
            response = res.body;
            expect(res.status).to.eq(200);
            done()
        })
        })
});

describe('Test getting question answers when questionnaire_id is invalid (Post Request: {baseurl}/getquestionanswers/:questionnaireID/:questionID)', () => {
    it('Should return totals with status 400', (done) => {
        request(app)
        .get('/inteliq_api/getquestionanswers/' + invalid_quesstionnaire_id + "/" + valid_question_id )
        .end((err, res) => {
            response = res.body;
            expect(res.status).to.eq(400);
            done()
        })
        })
});

describe('Test getting question answers when question_id is invalid (Post Request: {baseurl}/getquestionanswers/:questionnaireID/:questionID)', () => {
    it('Should return totals with status 400', (done) => {
        request(app)
        .get('/inteliq_api/getquestionanswers/' + valid_quesstionnaire_id + "/" + invalid_question_id )
        .end((err, res) => {
            response = res.body;
            expect(res.status).to.eq(400);
            done()
        })
        })
});




