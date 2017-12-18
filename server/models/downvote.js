module.exports = (sequelize, DataTypes) => {
  const Downvote = sequelize.define('Downvote', {
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
  Downvote.associate = (models) => {
    Downvote.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
  };
  return Downvote;
};
