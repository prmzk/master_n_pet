"use strict"

const router = require('express').Router()
const adminRouter = require('./adminRoutes')

router.get('/', (req, res) => res.render('home.ejs'))
router.use('/admin', adminRouter)

module.exports = router;