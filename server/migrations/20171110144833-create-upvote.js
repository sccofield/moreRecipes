

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Upvotes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    recipeId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Recipes',
        key: 'id',
        as: 'recipe'
      }
    },
    vote: {
      type: Sequelize.BOOLEAN
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
        as: 'user'
      }
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('Upvotes')
};
