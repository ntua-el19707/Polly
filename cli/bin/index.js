const commands = require("commander");
const figlet = require('figlet');
const clear = require('clear');


///functions
const login = require('../src/login.js');
const register = require('../src/register.js');


const question = require('../src/question.js');
const questionnaire = require('../src/questionnaire.js');
const getsessionanswers = require('../src/getsessionanswers.js');
const getquestionanswers = require('../src/getquestionanswers.js');
const doanswer = require('../src/doanswer.js');

///Admin Functions
const healthcheck = require('../src/healthcheck.js');
const resetq = require('../src/resetq.js');
const resetall = require('../src/resetall.js');
const questionnaire_upd = require('../src/questionnaire_upd.js');
const getstats = require('../src/getstats.js');

///functions



///login
commands.command('login')
        .option('-u, --username [id]', 'Username')
        .option('-p, --password [id]', 'Password')
        .action( function(o) { login(o) } )
///login

///register
commands.command('register')
        .option('-u, --username [id]', 'Username')
        .option('-p1, --password1 [id]', 'Password1')
        .option('-p2, --password2 [id]', 'Password2')
        //.option('-c, --changepass [id]', 'Change_Password')
        .option('-r, --registeruser [id]', 'Register_User')
        .action( function(o) { register(o) } )

///register


///question
commands.command('question')
        .option('-p, --questionnaireID [id]', 'PollID')
        .option('-q, --questionID [id]', 'QuestionID')
        .option('-fm, --formatID [id]', 'FormatID')
        .action( function(o) { question(o) } )
///question

///questionnaire
commands.command('questionnaire')
        .option('-p, --questionnaireID [id]', 'PollID')
        .option('-fm, --formatID [id]', 'FormatID')
        .action( function(o) { questionnaire(o) } )

///questionnaire

///getsessionanswers
commands.command('getsessionanswers')
        .option('-p, --questionnaireID [id]', 'PollID')
        .option('-s, --sessionID [id]', 'SessionID')
        .option('-fm, --formatID [id]', 'FormatID')
        .action( function(o) { getsessionanswers(o) } )
///getsessionanswers

///getquestionanswers
commands.command('getquestionanswers')
        .option('-p, --questionnaireID [id]', 'PollID')
        .option('-q, --questionID [id]', 'QuestionID')
        .option('-fm, --formatID [id]', 'FormatID')
        .action( function(o) { getquestionanswers(o) } )
///getquestionanswers

///doanswer
commands.command('doanswer')
        .option('-p, --questionnaireID [id]', 'PollID')
        .option('-q, --questionID [id]', 'QuestionID')
        .option('-s, --session [id]', 'SessionID')
        .option('-a, --optionsID [id]', 'OptionID')
        .action( function(o) { doanswer(o) } )

///doanswer


///healthcheck
commands.command('healthcheck')
        .option('-t, --token')
        .action( function(o) { healthcheck(o) } )
///healthcheck

///resetq
commands.command('resetq')
        .option('-p, --questionnaireID [id],PollID')
        .option('-t, --token')
        .action( function(o) { resetq(o) } )
///resetq

///resetall
commands.command('resetall')
        .option('-t, --token')
        .action( function(o) { resetall(o) } )
///resetall

///questionnaire_upd

commands.command('questionnaire_upd')
        .option('-t, --token')
        .option('-f, --file [id],ReadFile')
        .action( function(o) { questionnaire_upd(o) } )

///questionnaire_upd

///getstats

commands.command('getstats')
        .option('-t, --token')
        .option('-p, --questionnaireID [id],PollID')
        .action( function(o) { getstats(o) } )

///getstats



commands.parse(process.argv);
