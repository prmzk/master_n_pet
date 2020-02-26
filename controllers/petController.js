"use strict"

const { Pet } = require('../models/index')

class Controller {
    static show(req, res){
        Pet.findAll({
            attributes: {
                exclude: ['updatedAt', 'createdAt']
            },
            order: ['id']
        })
        .then(result => {
            let success = req.app.locals.success
            delete req.app.locals.success
            res.render('petList.ejs', {success:success, data:result})
        })
    }

    static showAdd(req, res){
        res.render('addPet.ejs', {error:null})
    }

    static add(req, res){
        Pet.create(req.body)
        .then(result => {
            req.app.locals.success = 'Pet added.'
            res.redirect('/pets')
        })
        .catch(err => res.send (err))
    }

    static showEdit(req, res){
        Pet.findAll({
            where:{
                id: req.params.id
            },
            attributes:{
                excludes: ['updatedAt', 'createdAt']
            }
        })
        .then(result => res.render('editPet.ejs', {error: null}))
        .catch(err => res.send(err))
    }

    static edit(req, res){
        Pet.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            req.app.locals.success = 'Pet edited.'
            res.redirect('/pets')
        })
        .catch(err => res.send (err))
    }

    static delete(req, res){
        Pet.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            req.app.locals.success = 'Pet deleted.'
            res.redirect('/pets')
        })
        .catch(err => res.send (err))
    }
}