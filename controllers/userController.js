const { User } = require('../models/index.js');

class Controller {
    static loginShow(req, res) {
        res.render('userLogin')
    }
    static logIn(req, res) {
        
    }
}

module.exports = Controller;