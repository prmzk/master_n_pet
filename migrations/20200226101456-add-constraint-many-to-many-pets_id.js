'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('UserPets', ['pet_id'], {
      type: 'foreign key',
      name: 'custom_fkey_pet_id',
      references: {
        table: 'Pets',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('UserPets', 'custom_fkey_pet_id')
  }
};
