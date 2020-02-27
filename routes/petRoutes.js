"use strict"

const router = require('express').Router()
const Controller = require('../controllers/petController')

router.get('/', Controller.show)

router.get('/add', Controller.showAdd)
router.post('/add', Controller.add)

router.get('/edit/:id', Controller.showEdit)
router.post('/edit/:id', Controller.edit)

router.get('/delete/:id', Controller.delete)

router.get('/profile/:id', Controller.showProfile)

module.exports = router;
