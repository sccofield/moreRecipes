module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    recipeId: {
      type: DataTypes.NUMBER,
    },
    userId: {
      type: DataTypes.NUMBER,
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
