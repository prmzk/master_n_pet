"use strict"

const { Pet, User, UserPet } = require('../models/index')
const helper = require('../helper/imghelper')

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
            if(req.session.error) delete req.session.error
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
            if(req.session.error) delete req.session.error
            res.render('petsUser.ejs', {data:result, user:req.session.user, helper:helper, filter:null})
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

    static showEditUser(req, res){
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
            .then(resultUser => res.render('editPetUser.ejs', {error: req.session.error, data:result[0].dataValues, owner:resultUser}))
            
        })
        .catch(err => res.send(err))
    }

    static editUser(req, res){
        Pet.update(req.body, {
            where: {
                id: req.params.id
            },
            individualHooks: true,
        })
        .then(result => {
            res.redirect('/user/mypet')
        })
        .catch(err => {
            res.send(err)
        })
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
        .catch(err => console.log(err))
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
            res.render('petProfile.ejs', {data: result[0], user:req.session.user, helper:helper})
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

    static showInterested(req, res){
        Pet.findAll({
            include:{
                model: User,
                as: 'Interested By'
            },
            where:{
                id: req.params.petId
            }
        })
        .then(result => res.render('interestedBy.ejs', {data:result[0], petId:req.params.petId}))
        .catch(err => res.send(err))
    }

    static changeOwner(req, res){
        Pet.update(
            {
                owner_id: req.params.newId,
                status: 'unavailable'
            },
            {
                where: {
                    id: req.params.petId
                }
            }
        )
        .then(result => {
            UserPet.destroy({
                where:{
                    pet_id: req.params.petId
                }
            })
            .then(result => res.redirect('/pets'))
        })
    }

    static showBreeding(req, res){
        Pet.findAll({
            include:{
                model: User,
                as: 'Owner'
            },
            attributes: {
                exclude: ['updatedAt', 'createdAt']
            },
            order: ['id'],
            where: {
                status: 'for breeding'
            }
        })
        .then(result => {
            let success = req.app.locals.success
            delete req.app.locals.success
            res.render('petsUser.ejs', {data:result, user:req.session.user, helper:helper, filter:1})
        })
    }
    
    static showAdopting(req, res){
        Pet.findAll({
            include:{
                model: User,
                as: 'Owner'
            },
            attributes: {
                exclude: ['updatedAt', 'createdAt']
            },
            order: ['id'],
            where: {
                status: 'for adopting'
            }
        })
        .then(result => {
            let success = req.app.locals.success
            delete req.app.locals.success
            res.render('petsUser.ejs', {data:result, user:req.session.user, helper:helper, filter:2})
        })
    }
}

module.exports = Controller;