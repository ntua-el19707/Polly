
const request = require('supertest');
const chai = require('chai')
const expect = chai.expect;
const app = require('../api-backend/app');
require('custom-env').env('localhost'); 

const valid_quesstionnaire_id = 2;

const invalid_quesstionnaire_id = 300;

const valid_session = "aaaa";

const invalid_session = "aa";

const valid_question_id = 2;

const invalid_question_id = 300;

const valid_option_id = 2;

const invalid_option_id = 100;

const non_existing_option_id = 6;



let response;

describe('Test entering answer when session is valid (Post Request: {baseurl}/doanswer/:questionnaireID/:questionID/:session/:optionID)', () => {
    it('Should return totals with status 200', (done) => {
        request(app)
        .post('/inteliq_api/doanswer/' + valid_quesstionnaire_id + "/" + valid_question_id + "/" + valid_session + "/" + valid_option_id )
        .end((err, res) => {
            response = res.body;
            expect(res.status).to.eq(200);
            done()
        })
        })
});


describe('Test entering answer when session is invalid (Post Request: {baseurl}/doanswer/:questionnaireID/:questionID/:session/:optionID)', () => {
    it('Should return totals with status 400', (done) => {
        request(app)
        .post('/inteliq_api/doanswer/' + valid_quesstionnaire_id + "/" + valid_question_id + "/" + invalid_session + "/" + valid_option_id )
        .end((err, res) => {
            response = res.body;
            expect(res.status).to.eq(400);
            done()
        })
        })
});


describe('Test entering answer when option_id is invalid (Post Request: {baseurl}/doanswer/:questionnaireID/:questionID/:session/:optionID)', () => {
    it('Should return totals with status 400', (done) => {
        request(app)
        .post('/inteliq_api/doanswer/' + valid_quesstionnaire_id + "/" + valid_question_id + "/" + valid_session + "/" + invalid_option_id )
        .end((err, res) => {
            response = res.body;
            expect(res.status).to.eq(400);
            done()
        })
        })
});


describe('Test entering answer when question_id is invalid (Post Request: {baseurl}/doanswer/:questionnaireID/:questionID/:session/:optionID)', () => {
    it('Should return totals with status 400', (done) => {
        request(app)
        .post('/inteliq_api/doanswer/' + valid_quesstionnaire_id + "/" + invalid_question_id + "/" + valid_session + "/" + valid_option_id )
        .end((err, res) => {
            response = res.body;
            expect(res.status).to.eq(400);
            done()
        })
        })
});


describe('Test entering answer when questionnaire_id is invalid (Post Request: {baseurl}/doanswer/:questionnaireID/:questionID/:session/:optionID)', () => {
    it('Should return totals with status 400', (done) => {
        request(app)
        .post('/inteliq_api/doanswer/' + invalid_quesstionnaire_id + "/" + valid_question_id + "/" + valid_session + "/" + valid_option_id )
        .end((err, res) => {
            response = res.body;
            expect(res.status).to.eq(400);
            done()
        })
        })
});

/*
describe('Test entering answer when option_id does not exist (Post Request: {baseurl}/doanswer/:questionnaireID/:questionID/:session/:optionID)', () => {
    it('Should return totals with status 402', (done) => {
        request(app)
        .post('/inteliq_api/doanswer/' + valid_quesstionnaire_id + "/" + valid_question_id + "/" + valid_session + "/" + non_existing_option_id )
        .end((err, res) => {
            response = res.body;
            expect(res.status).to.eq(402);
            done()
        })
        })
});

*/
