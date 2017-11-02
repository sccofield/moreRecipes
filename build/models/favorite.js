'use strict';

module.exports = function (sequelize, DataTypes) {
  var Favorite = sequelize.define('Favorite', {
    userId: {
      type: DataTypes.INTEGER
    },
    recipeId: {
      type: DataTypes.INTEGER
    }
  }, {
    classMethods: {
      associate: function associate(models) {
        // associations can be defined here
        Favorite.belongsTo(models.User, {
          foreignKey: 'userId'
        });
      }
    }
  });
  return Favorite;
};