"use strict"

const router = require('express').Router()
const adminRouter = require('./adminRoutes')
const userRouter = require('./userRoutes')
const petRouter = require('./petRoutes')

router.get('/', (req, res) => {
    let user = req.session.user
    if(user){
        console.log(user)
        console.log(user.name)
    }
    // res.send(user);
    res.render('home.ejs', {user: user})
})
router.use('/admin', adminRouter)
router.use('/user', userRouter)
router.use('/pets', petRouter)

module.exports = router;