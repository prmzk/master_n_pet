"use strict"

const router = require('express').Router()
const adminRouter = require('./adminRoutes')
const userRouter = require('./userRoutes')
const petRouter = require('./petRoutes')

router.get('/', (req, res) => {
    let user = req.session.user
<<<<<<< HEAD
    res.render('home.ejs', {user: user, admin: req.session.admin})
=======
    res.render('home.ejs', {user: user, admin:req.session.admin})
>>>>>>> 7bbc7eff92c17555b3f59b484948cd79f401dd13
})
router.use('/admin', adminRouter)
router.use('/user', userRouter)
router.use('/pets', petRouter)

module.exports = router;