"use strict"

const router = require('express').Router()
const adminRouter = require('./adminRoutes')
const userRouter = require('./userRoutes')
const petRouter = require('./petRoutes')

router.get('/', (req, res) => res.render('home.ejs'))
router.use('/admin', adminRouter)
router.use('/user', userRouter)
router.use('/pets', petRouter)

module.exports = router;