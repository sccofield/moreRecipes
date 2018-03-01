module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    userName: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
    ingredients: {
      type: DataTypes.TEXT,
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
    Recipe.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    Recipe.hasMany(models.Review, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });

    Recipe.hasMany(models.Favorite, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });

    Recipe.hasMany(models.Upvote, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });

    Recipe.hasMany(models.Downvote, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
  };
  return Recipe;
};
