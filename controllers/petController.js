"use strict"

const { Pet, User, UserPet } = require('../models/index')

class Controller {
    static showAdmin(req, res){
        Pet.findAll({
            include:{
                model: User,
                as: 'Owner'
            },
            attributes: {
                exclude: ['updatedAt', 'createdAt']
            },
            order: ['id']
        })
        .then(result => {
            let success = req.app.locals.success
            delete req.app.locals.success
            console.log(result)
            res.render('pets.ejs', {success:success, data:result})
        })
    }

    static show(req, res){
        Pet.findAll({
            include:{
                model: User,
                as: 'Owner'
            },
            attributes: {
                exclude: ['updatedAt', 'createdAt']
            },
            order: ['id']
        })
        .then(result => {
            let success = req.app.locals.success
            delete req.app.locals.success
            res.render('petsUser.ejs', {data:result, user:req.session.user})
        })
    }

    static showAdd(req, res){
        User.findAll({
            order:['id']
        })
        .then(result => {
            if(req.session.admin){
                res.render('addPet.ejs', {error: req.session.error, owner:result})
            }else{
                res.render('addPetUser.ejs', {error: req.session.error})
            }
        })
        .catch(err => res.render(err))
    }

    static add(req, res){
        if(!req.session.admin) req.body['owner_id'] = req.session.user.id
        Pet.create(req.body)
        .then(result => {
            req.app.locals.success = 'Pet added.'
            res.redirect('/pets')
        })
        .catch(err => {
            if(req.session.error) delete req.session.error
            req.session.error = err
            Controller.showAdd(req, res)
        })
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
        .then(result => {
            User.findAll({
                order:['id']
            })
            .then(resultUser => res.render('editPet.ejs', {error: req.session.error, data:result[0].dataValues, owner:resultUser}))
            
        })
        .catch(err => res.send(err))
    }

    static edit(req, res){
        Pet.update(req.body, {
            where: {
                id: req.params.id
            },
            individualHooks: true
        })
        .then(result => {
            req.app.locals.success = 'Pet edited.'
            res.redirect('/pets')
        })
        .catch(err => {
            if(req.session.error) delete req.session.error
            req.session.error = err
            Controller.showEdit(req, res)
        })
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

    static showProfile(req, res){
        Pet.findAll({
            where: {
                id: req.params.id
            },
            include : [{
                model: User,
                as: 'Owner'
            },
            {
                model: User,
                as: 'Interested By'
            }],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
        .then(result => {
            res.render('petProfile.ejs', {data: result[0], user:req.session.user})
        })
    }

    static addInterested(req, res){
        UserPet.create({
            user_id: req.session.user.id,
            pet_id: req.params.petId
        })
        .then(result => res.redirect('/pets'))
        .catch(err => res.send(err))
    }
}

module.exports = Controller;