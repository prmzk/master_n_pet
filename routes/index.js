"use strict"

const router = require('express').Router()
const adminRouter = require('./adminRoutes')
const userRouter = require('./userRoutes')

router.get('/', (req, res) => res.render('home.ejs'))
router.use('/admin', adminRouter)
router.use('/user', userRouter)

module.exports = router;