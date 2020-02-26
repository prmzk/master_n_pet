"use strict"

const router = require('express').Router()
const Controller = require('../controllers/userController')

router.get('/login', Controller.loginShow)

module.exports = router;
