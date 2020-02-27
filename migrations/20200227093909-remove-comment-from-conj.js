'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('UserPets', 'comment', {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('UserPets', 'comment', Sequelize.STRING)

  }
};
