var DataTypes = require("sequelize").DataTypes;
var _Polls = require("./Polls");
var _Questions = require("./Questions");
var _answers = require("./answers");
var _report_answers = require("./report_answers");
var _reportfornotstats = require("./reportfornotstats");
var _reportforstats = require("./reportforstats");
var _users = require("./users");
var _keywords = require("./keywords")
function initModels(sequelize) {
  var Polls = _Polls(sequelize, DataTypes);
  var Questions = _Questions(sequelize, DataTypes);
  var answers = _answers(sequelize, DataTypes);
  var report_answers = _report_answers(sequelize, DataTypes);
  var reportfornotstats = _reportfornotstats(sequelize, DataTypes);
  var reportforstats = _reportforstats(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var keywords = _keywords(sequelize,DataTypes) 
  Polls.hasMany(keywords,{as:"keywords",foreignKey:"poll_id"});
  keywords.belongsTo(Polls,{ as: "poll", foreignKey: "poll_id"})
  Questions.belongsTo(Polls, { as: "poll", foreignKey: "poll_id"});
  Polls.hasMany(Questions, { as: "Questions", foreignKey: "poll_id"});
  report_answers.belongsTo(Polls, { as: "poll", foreignKey: "poll_id"});
  Polls.hasMany(report_answers, { as: "report_answers", foreignKey: "poll_id"});
  answers.belongsTo(Questions, { as: "question", foreignKey: "question_id"});
  Questions.hasMany(answers, { as: "answers", foreignKey: "question_id"});
  answers.belongsTo(Questions, { as: "depented_q", foreignKey: "depented_qid"});
  Questions.hasMany(answers, { as: "depented_q_answers", foreignKey: "depented_qid"});
  reportfornotstats.belongsTo(Questions, { as: "question", foreignKey: "question_id"});
  Questions.hasMany(reportfornotstats, { as: "reportfornotstats", foreignKey: "question_id"});
  reportforstats.belongsTo(Questions, { as: "question", foreignKey: "question_id"});
  Questions.hasMany(reportforstats, { as: "reportforstats", foreignKey: "question_id"});
  reportforstats.belongsTo(answers, { as: "answer", foreignKey: "answer_id"});
  answers.hasMany(reportforstats, { as: "reportforstats", foreignKey: "answer_id"});
  reportfornotstats.belongsTo(report_answers, { as: "report", foreignKey: "report_id"});
  report_answers.hasMany(reportfornotstats, { as: "reportfornotstats", foreignKey: "report_id"});
  reportforstats.belongsTo(report_answers, { as: "report", foreignKey: "report_id"});
  report_answers.hasMany(reportforstats, { as: "reportforstats", foreignKey: "report_id"});
  Polls.belongsTo(users, { as: "email_user", foreignKey: "email"});
  users.hasMany(Polls, { as: "Polls", foreignKey: "email"});

  return {
    Polls,
    Questions,
    answers,
    report_answers,
    reportfornotstats,
    reportforstats,
    users,keywords
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
