'use strict';
module.exports = (sequelize, DataTypes) => {
  class Pet extends sequelize.Sequelize.Model{}
  Pet.init({
    name: {
      type:DataTypes.STRING,
      validate: {
        is: {
          args: /^[a-z]+$/i,
          msg: 'Pets name not valid' 
        }
      }
    },
    species: DataTypes.STRING,
    breed: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'Breed cannot be empty'
        }
      }
    },
    age: {
      type:DataTypes.INTEGER,
      validate:{
        isInt:{
          msg: 'Pets age not valid'
        }
      }
    },
    status: DataTypes.STRING,
    owner_id: DataTypes.INTEGER
  }, {
    hooks:{
      beforeCreate: (pet, options) => {
        if(!pet.owner_id) pet.owner_id = null
        else pet.owner_id = Number(pet.owner_id)
      },
      beforeUpdate: (pet, options) => {
        if(!pet.owner_id) pet.owner_id = null
        else pet.owner_id = Number(pet.owner_id)
      }
    },
    sequelize,
    modelName: 'Pet'
  });
  Pet.associate = function(models) {
    // associations can be defined here
    Pet.belongsTo(models.User, {foreignKey: 'owner_id'})
  };
  return Pet;
};