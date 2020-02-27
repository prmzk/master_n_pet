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
        let user = req.body
        User.findAll({
            where: {username: user.username}
        })
            .then(users => {
                if(users[0]) {
                    let toReturn = {
                        user: users[0],
                        passCorrect: null
                    }
                    bcrypt.compare(user.password, users[0].password)
                    .then(passResult => {
                        toReturn.passCorrect = passResult
                        return toReturn
                    })
                }
                else {
                    throw new Error('Username salah!')
                }
            })
            .then(toReturn => {
                if(toReturn.passCorrect) {
                    req.session.user = toReturn.user;
                    res.redirect('/')
                }
                else{
                    throw new Error('Password salah!')
                }
            })
    }
    static 
}

module.exports = Controller;