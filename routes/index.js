"use strict"

const router = require('express').Router()
const adminRouter = require('./adminRoutes')
const userRouter = require('./userRoutes')
const petRouter = require('./petRoutes')

router.get('/', (req, res) => {
    let user = req.session.user
    let admin = req.session.admin
    if(user){
        console.log(user)
        console.log(user.name)
    }
    // res.send(user);
    res.render('home.ejs', {user: user, admin: admin})
})
router.use('/admin', adminRouter)
router.use('/user', userRouter)
router.use('/pets', petRouter)

module.exports = router;