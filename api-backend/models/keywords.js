const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('keywords', {
    
     poll_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    
      references: {
        model: 'Polls',
        key: 'poll_id'
      }
      
    },
    keyword: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    keyword_id:{
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true

    }

  }, {
    //sequelize,
    onDelete: 'CASCADE',
    tableName: 'keywords',
    timestamps: false,
   
   
  });
};
