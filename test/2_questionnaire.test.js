
const request = require('supertest');
const chai = require('chai')
const expect = chai.expect;
const app = require('../api-backend/app');
require('custom-env').env('localhost'); 

const valid_quesstionnaire_id = 1;

const invalid_quesstionnaire_id = 100;

let response;

describe('Test if questionnaire ID are valid (Get Request: {baseurl}/questionnaire2/:questionnaireID)', () => {
    it('Should return totals with status 200', (done) => {
        request(app)
        .get('/inteliq_api/questionnaire2/' + valid_quesstionnaire_id )
        .end((err, res) => {
            response = res.body;
            expect(res.status).to.eq(200);
            done()
        })
        })

    it('Should return an object', () => {
        expect(response).to.be.an('object');
    })
});

describe('Test questionnaire ID are valid (Get Request: {baseurl}/questionnaire2/:questionnaireID)', () => {
    it('Should return totals with status 400', (done) => {
        request(app)
        .get('/inteliq_api/questionnaire2/' + invalid_quesstionnaire_id )
        .end((err, res) => {
            response = res.body;
            expect(res.status).to.eq(400);
            done()
        })
        })

    it('Should return an object', () => {
        expect(response).to.be.an('object');
    })
});
