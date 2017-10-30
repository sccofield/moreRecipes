module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
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
      type: DataTypes.ARRAY,
    },
    votes: {
      type: DataTypes.ARRAY
    },
    views: {
      type: DataTypes.INTERGER
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Recipe.hasMany(models.Review, {
          foreignKey: 'recipeId'
        });

        Recipe.belongsTo(models.User, {
          foreignKey: 'userId',
        });

        Recipe.hasMany(models.Favorite, {
          foreignKey: 'recipeId',
        });
      }
    }
  });
  return Recipe;
};
