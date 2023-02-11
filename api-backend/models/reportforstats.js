const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reportforstats', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    report_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'report_answers',
        key: 'report_id'
      }
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Questions',
        key: 'question_id'
      }
    },
    answer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'answers',
        key: 'answer_id'
      }
    }
  }, {
    sequelize,
    tableName: 'reportforstats',
    timestamps: false,
    onDelete: 'CASCADE',
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "analitics_reports",
        using: "BTREE",
        fields: [
          { name: "report_id" },
        ]
      },
      {
        name: "report_question",
        using: "BTREE",
        fields: [
          { name: "question_id" },
        ]
      },
      {
        name: "report_answer_reference",
        using: "BTREE",
        fields: [
          { name: "answer_id" },
        ]
      },
    ]
  });
};
