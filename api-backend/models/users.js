const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    hashpw: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    saltpw: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    full_name:{
      type: DataTypes.STRING(25),
      allowNull:true 
     }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
};
