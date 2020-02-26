"use strict"

const router = require('express').Router()
const Controller = require('../controllers/userController')

router.get('/login', Controller.loginShow)
router.post('/login', Controller.logIn)

module.exports = router;
