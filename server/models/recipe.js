module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.STRING,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
    ingredients: {
      type: DataTypes.STRING,
    },
    votes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });
  Recipe.associate = (models) => {
    Recipe.hasMany(models.Review, {
      foreignKey: 'recipeId'
    });

    Recipe.belongsTo(models.User, {
      foreignKey: 'userId',
    });

    Recipe.hasMany(models.Favorite, {
      foreignKey: 'recipeId',
    });

    Recipe.hasMany(models.Upvote, {
      foreignKey: 'recipeId',
    });

    Recipe.hasMany(models.Downvote, {
      foreignKey: 'recipeId',
    });
  };
  return Recipe;
};
