"use strict"

const router = require('express').Router()
const Controller = require('../controllers/userController')

router.get('/signup', Controller.signUpShow)
router.post('/signup', Controller.signUp)
router.get('/login', Controller.loginShow)
router.post('/login', Controller.logIn)
router.get('/logout', Controller.logOut)

router.get('/mypet', (req, res, next) => {
    if(!req.session.user){
        res.redirect('/user/login')
    }else{
        next()
    }
}
,Controller.showPet)

module.exports = router;
