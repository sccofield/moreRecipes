'use strict';

module.exports = function (sequelize, DataTypes) {
  var Review = sequelize.define('Review', {
    recipeId: {
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER
    },
    review: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function associate(models) {
        // associations can be defined here
        Review.belongsTo(models.Recipe, {
          foreignKey: 'recipeId'
        });
      }
    }
  });
  return Review;
};