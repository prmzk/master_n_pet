'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Pets', ['owner_id'], {
      type: 'foreign key',
      name: 'custom_fkey_owner_id',
      references: {
        table: 'Users',
        field: 'id'
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Pets', 'custom_fkey_owner_id')
  }
};
