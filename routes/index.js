"use strict"

const router = require('express').Router()
const adminRouter = require('./adminRoutes')

router.get('/', (req, res) => res.send('home'))
router.use('/admin', adminRouter)

module.exports = router;