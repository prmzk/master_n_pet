const { User } = require('../models/index.js');

class Controller {
    static loginShow(req, res) {
        res.render('userlogin')
    }
}

module.exports = Controller;