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
      type: DataTypes.INTEGER
    },
    views: {
      type: DataTypes.INTEGER
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
  };
  return Recipe;
};
