
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    id: 1,
    userName: 'nike',
    email: 'michael@yahoo.com',
    password: 'michael',
    createdAt: '2007-09-28 01:00:00',
    updatedAt: '2007-09-28 01:00:00'
  }], {}),

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};