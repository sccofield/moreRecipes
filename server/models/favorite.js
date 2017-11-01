module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    userId: {
      type: DataTypes.INTEGER,
    },
    recipeId: {
      type: DataTypes.INTEGER
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
