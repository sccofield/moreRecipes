module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    recipeId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER
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
