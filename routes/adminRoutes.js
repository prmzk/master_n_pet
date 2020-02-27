"use strict"

const router = require('express').Router()
const Controller = require('../controllers/adminController')

router.get('/login', Controller.loginShow)
router.post('/login', Controller.login)
router.get('/logout', Controller.logOut)

module.exports = router;
