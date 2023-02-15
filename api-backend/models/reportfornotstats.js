const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reportfornotstats', {
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
    answer_text: {
      type: DataTypes.STRING(25),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'reportfornotstats',
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
        name: "non_stat_reports_1",
        using: "BTREE",
        fields: [
          { name: "report_id" },
        ]
      },
      {
        name: "report_question_1",
        using: "BTREE",
        fields: [
          { name: "question_id" },
        ]
      },
    ]
  });
};
