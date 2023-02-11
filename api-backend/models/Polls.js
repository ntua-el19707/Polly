const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Polls', {
    poll_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
      
    },
    title: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'users',
        key: 'email'
      }
    }
  }, {
    sequelize,
    tableName: 'Polls',
    timestamps: false,
    
    onDelete: 'CASCADE',
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "poll_id" },
        ]
      },
      {
        name: "poll_creator",
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
};
