module.exports = (sequelize, DataTypes) => {
  const Upvote = sequelize.define('Upvote', {
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
  Upvote.associate = (models) => {
    Upvote.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
  };
  return Upvote;
};
