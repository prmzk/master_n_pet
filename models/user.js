'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model{}
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 15]
      }},
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, options) => {
        return bcrypt.hash(user.password, 10)
                  .then(hash => user.password = hash)
                  .catch(err => err)
      },
      beforeUpdate: (user, options) => {
        return bcrypt.hash(user.password, 10)
                  .then(hash => user.password = hash)
                  .catch(err => err)
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Pet, {through: models.UserPet, foreignKey: "user_id"})
  };
  return User;
};