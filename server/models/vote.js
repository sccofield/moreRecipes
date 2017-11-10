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
  });
  Vote.associate = (models) => {
    Vote.belongsTo(models.Recipe, {
      foreignKey: 'recipeId'
    });
  };
  return Vote;
};
