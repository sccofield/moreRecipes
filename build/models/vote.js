'use strict';

module.exports = function (sequelize, DataTypes) {
  var Vote = sequelize.define('Vote', {
    recipeId: {
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER
    },
    vote: {
      type: DataTypes.BOOLEAN
    }
  }, {
    classMethods: {
      associate: function associate(models) {
        // associations can be defined here
        Vote.belongsTo(models.Recipe, {
          foreignKey: 'recipeId'
        });
      }
    }
  });
  return Vote;
};