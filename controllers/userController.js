const { User, Pet } = require('../models/index.js');
const bcrypt = require('bcrypt')

class Controller {
    static loginShow(req, res) {
        res.render('loginUser')
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
        let userToLog = req.body
        User.findAll({
            where: {username: userToLog.username}
        })
            .then(users => {
                if(users[0]) {
                    let toReturn = {
                        user: users[0],
                        passCorrect: null
                    }
                    bcrypt.compare(userToLog.password, users[0].password)
                    .then(passResult => {
                        console.log(passResult)
                        toReturn.passCorrect = passResult
                        return toReturn
                    }).then(toReturn => {
                        if(toReturn.passCorrect) {
                            req.session.user = toReturn.user;
                            res.redirect('/')
                        }
                        else{
                            throw new Error('Password salah!')
                        }
                    })
                }
                else {
                    throw new Error('Username salah!')
                }
            })
            .catch(errors => res.send(errors))
            
    }
    static logOut(req, res) {
        req.session.destroy()
        res.redirect('/')
    }

    static showPet(req, res){
        Pet.findAll({
            where: {
                owner_id: req.session.user.id
            },
            attributes: {
                exclude: ['updatedAt', 'createdAt']
            }
        })
        .then(result => res.render('myPet.ejs', {data:result}))
        .catch(errors => res.send(errors))
    }
}

module.exports = Controller;