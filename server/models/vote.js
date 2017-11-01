module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    recipeId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    vote: {
      type: DataTypes.BOOLEAN
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Vote.belongsTo(models.Recipe, {
          foreignKey: 'recipeId'
        });
      }
    }
  });
  return Vote;
};
