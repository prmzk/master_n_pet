"use strict"

const router = require('express').Router()
const Controller = require('../controllers/petController')

router.get('/', (req, res, next) => {
   if(!req.session.admin){
       Controller.show(req, res)
   }else{
       next()
   }
}, Controller.showAdmin)

router.get('/add', Controller.showAdd)
router.post('/add', Controller.add)

router.get('/edit/:id', Controller.showEdit)
router.post('/edit/:id', Controller.edit)

router.get('/delete/:id', Controller.delete)

router.get('/profile/:id', Controller.showProfile)
router.get('/interested/:petId', Controller.addInterested)

router.get('/:petId/interestedby', Controller.showInterested)

module.exports = router;
