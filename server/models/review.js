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
  });
  Review.associate = (models) => {
    Review.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
    Review.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Review;
};
