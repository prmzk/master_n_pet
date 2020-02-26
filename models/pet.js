'use strict';
module.exports = (sequelize, DataTypes) => {
  class Pet extends sequelize.Sequelize.Model{}
  Pet.init({
    name: DataTypes.STRING,
    species: DataTypes.STRING,
    breed: DataTypes.STRING,
    age: DataTypes.INTEGER,
    status: DataTypes.STRING,
    owner_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pet'
  });
  Pet.associate = function(models) {
    // associations can be defined here
    Pet.belongsToMany(models.User, {through: models.UserPet, foreignKey: 'pet_id'})
  };
  return Pet;
};