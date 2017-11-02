'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      id: 1,
      userName: 'nike',
      email: 'michael@yahoo.com',
      password: 'michael',
      createdAt: '2007-09-28 01:00:00',
      updatedAt: '2007-09-28 01:00:00'
    }], {});
  },

  down: function down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};