'use strict';
const fs = require('fs')
const bcrypt = require('bcrypt')
module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = JSON.parse(fs.readFileSync('./database/admin.json', 'utf8'))
    data.forEach(el => {
      el['createdAt'] = new Date()
      el['updatedAt'] = new Date()
      el.password = bcrypt.hashSync(el.password, 10);
    })
    return queryInterface.bulkInsert('Admins', data)
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Admins', null, {})
  }
};
