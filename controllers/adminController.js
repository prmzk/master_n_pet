"use strict"

const { Admin } = require('../models/index')
const bcrypt = require('bcrypt')

class Controller {
    static loginShow(req, res){
        res.render('loginAdmin.ejs', {error:null})
    }

    static login(req, res){
        Admin.findAll({
            where:{
                username: req.body.username
            }
        })
        .then(result => {
            if(result[0]){
                return bcrypt.compare(req.body.password, result[0].dataValues.password)
            }else{
                throw new Error('admin username false')
            }
        }).then(passCorrect => {
            if(passCorrect){
                req.session.admin = true
                res.redirect('/')
            }else{
                throw new Error('wrong pass')
            }
        })
        .catch(err => res.render('loginAdmin.ejs', {error:err}))
    }

    static logOut(req, res){
        req.session.destroy()
        res.redirect('/')
    }
}


module.exports = Controller