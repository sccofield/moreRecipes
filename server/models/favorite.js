module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    userId: {
      type: DataTypes.NUMBER,
    },
    recipeId: {
      type: DataTypes.NUMBER
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Favorite.belongsTo(models.User, {
          foreignKey: 'userId'
        });
      }
    }
  });
  return Favorite;
};
