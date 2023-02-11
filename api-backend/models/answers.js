const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('answers', {
    answer_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    atext: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Questions',
        key: 'question_id'
      }
    },
    depented_qid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Questions',
        key: 'question_id'
      }
    },
    sequence: {
      type: DataTypes.STRING(1),
      allowNull: false
    }
  }, {
    sequelize,
    onDelete: 'CASCADE',
    tableName: 'answers',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "answer_id" },
        ]
      },
      {
        name: "answer_question",
        using: "BTREE",
        fields: [
          { name: "question_id" },
        ]
      },
      {
        name: "answer_depnetd_question",
        using: "BTREE",
        fields: [
          { name: "depented_qid" },
        ]
      },
    ]
  });
};
