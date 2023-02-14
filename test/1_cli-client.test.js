//const constructURL = require('../lib/constructURL');
const chai = require('chai')
const expect = chai.expect;
//const exec = require("child_process");





describe('DoAnswer URL', () => {
    it("se2254 doanswer --questionnaireID 1 --questionID 2 --session aaaa --optionsID 2 --format json", () => {
        expect(doanswer(1,2,"aaaa",2))
        .to.eq('http://localhost:9103/inteliq_api/doanswer/1/2/aaaa/2');
    });
});





describe('Question URL', () => {
    it("se2254 question --questionnaireID 1 --questionID 2 --format json", () => {
        expect(question(1,2))
        .to.eq('http://localhost:9103/inteliq_api/question/1/2?format=json');
    });
});




describe('Questionnaire URL', () => {
    it("se2254 questionnaire --questionnaireID 1 --format json", () => {
        expect(questionnaire2(1))
        .to.eq('http://localhost:9103/inteliq_api/questionnaire2/1?format=json');
    }); 
});


describe('GetSessionAnswers URL', () => {
    it("se2254 getsessionanswers --questionnaireID 1 --sessionID aaaa --format json", () => {
        expect(getsessionanswers(1,"aaaa"))
        .to.eq('http://localhost:9103/inteliq_api/getsessionanswers/1/aaaa?format=json');
    });
});


describe('GetQuestionAnswers URL', () => {
    it("se2254 getquestionanswers --questionnaireID 1 --sessionID 2 --format json", () => {
        expect(getquestionanswers(1,2))
        .to.eq('http://localhost:9103/inteliq_api/getquestionanswers/1/2?format=json');
    });
});




describe('Healthcheck URL ', () => {
    it('se2254 healthcheck --token token', () => {
        expect(healthcheck())
        .to.eq('http://localhost:9103/inteliq_api/admin/health');
    });
});


describe('Resetall URL', () => {
    it("se2254 resetall --token ", () => {
        expect(resetall())
        .to.eq('http://localhost:9103/inteliq_api/admin/resetall');
    });
});


describe('Resetq URL', () => {
    it("se2254 resetq --questionnaireID 1 --token ", () => {
        expect(resetq(1))
        .to.eq('http://localhost:9103/inteliq_api/admin/resetq/1');
    });
});







function doanswer  (pid,qid,sid,aid) {

    console.log(pid)

    
    let url='http://localhost:9103/inteliq_api/doanswer/'+pid+'/'+qid+'/'+sid+'/'+aid;

    return url;
}

function getquestionanswers (pid,qid) {
    
    let url='http://localhost:9103/inteliq_api/getquestionanswers/'+pid+'/'+qid  +'?format=json';

    return url;
}


function getsessionanswers (pid,qid) {
    
    let url='http://localhost:9103/inteliq_api/getsessionanswers/'+pid+'/'+qid  +'?format=json';

    return url;
}



function login () {
    
    let url='http://localhost:9103/inteliq_api/login';

    return url;
}



function question (pid,qid) {
    

    let url='http://localhost:9103/inteliq_api/question/'+pid+'/'+qid +'?format=json';

    return url;
}




function questionnaire2 (pid) {
    

    let url='http://localhost:9103/inteliq_api/questionnaire2/'+pid  + '?format=json';

    return url;
}


function resetall () {
    

    let url='http://localhost:9103/inteliq_api/admin/resetall';

    return url;
}


function resetq (pid) {
    

    let url='http://localhost:9103/inteliq_api/admin/resetq/'+pid;

    return url;
}

function healthcheck () {
    

    let url='http://localhost:9103/inteliq_api/admin/health';

    return url;
}


