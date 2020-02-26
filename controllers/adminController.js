"use strict"

const { Admin } = require('../models/index')

class Controller {
    static loginShow(req, res){
        res.render('loginAdmin.ejs')
    }
}


module.exports = Controller