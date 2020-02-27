'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('UserPets', ['user_id'], {
      type: 'foreign key',
      name: 'custom_fkey_user_id',
      references: {
        table: 'Users',
        field: 'id'
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('UserPets', 'custom_fkey_user_id')
  }
};
