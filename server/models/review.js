module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    recipeId: {
      type: DataTypes.NUMBER,
    },
    userId: {
      type: DataTypes.NUMBER
    },
    review: {
      type: DataTypes.STRING,
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Review.belongsTo(models.Recipe, {
          foreignKey: 'recipeId'
        });
      }
    }
  });
  return Review;
};
