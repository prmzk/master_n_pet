const { User } = require('../models/index.js');

class Controller {
    static loginShow(req, res) {
        res.render('userLogin')
    }
    static signUpShow(req, res) {
        res.render('userSignUp')
    }
    static signUp(req, res) {
        let newUser = req.body;
        User.create(newUser)
            .then(newUsers => res.redirect('/'))
            .catch(err => res.send(err))
    }
    static logIn(req, res) {
        
    }
}

module.exports = Controller;