'use strict';
module.exports = (sequelize, DataTypes) => {
  class UserPet extends sequelize.Sequelize.Model{}
  UserPet.init({
    user_id: DataTypes.INTEGER,
    pet_id: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserPet'
  });
  UserPet.associate = function(models) {
    // associations can be defined here
  };
  return UserPet;
};