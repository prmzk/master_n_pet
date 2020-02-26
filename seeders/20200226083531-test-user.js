'use strict';

let testUsers = [{
  first_name: "Naufal",
  last_name: "Yunan",
  username: "diponegoro123",
  password: "belanegara",
  createdAt: new Date,
  updatedAt: new Date
}, {
  first_name: "Felix",
  last_name: "Wina",
  username: "dokumentasi",
  password: "tolongdibaca",
  createdAt: new Date,
  updatedAt: new Date
}]

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', testUsers, {})
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
