const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const fieldSelect = 'name brand model description'

// TODO: externalize key to config file
const JWT_KEY = "ihPwY2TrghWf9OejSuF07DAj4L775YdM0tcxS7o"

exports.create = (req, res, next) => {
    console.log('userController.create')
    User.find({
        email: req.body.email
    })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                console.log('user not created, email already exists')
                return res.status(409).json({
                    message: 'email already exists'
                });
            } else {
                console.log('about to bcrypt.hash() ...')
                bcrypt.hash(req.body.password, 10, (error, hash) => {
                    if (error) {
                        console.log('userController.create() - error', error)
                        return res.status(500).json({
                            error: error
                        })
                    } else {
                        console.log('userController.create() - hash', hash)
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        })
                        user
                            .save()
                            .then(result => {
                                console.log('userController.create() - result', result)
                                res.status(201).json({
                                    message: `user created [${req.body.email}]`
                                });
                            })
                            .catch(error => {
                                console.log('userController.create() - error', error)
                                res.status(500).json({
                                    error: error
                                })
                            })
                    }
                })
            }
        })
}

exports.authenticate = (req, res, next) => {
    console.log('userController.authenticate()')
    User.findOne({ email: req.body.email })
        .exec()
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'authentication failed'
                })
            }
            bcrypt.compare(req.body.password, user.password, (error, result) => {
                if (error) {
                    console.log('userController.authenticate() - error', error);
                    return res.status(401).json({
                        message: 'authentication failed'
                    })
                }
                if (result) {
                    console.log('userController.authenticate() - bcrypt.compare() - result', result);
                    const token = jwt.sign(
                        {
                            email: user.email,
                            userId: user._id
                        },
                        JWT_KEY,
                        {
                            expiresIn: "2h"
                        }
                    )
                    // console.log("jwt.sign() done ...");
                    return res.status(200).json({
                        message: 'authentication successful',
                        token: token
                    })
                } else {
                    // wrong password
                    return res.status(401).json({
                        message: 'authentication failed'
                    })
                }
            })
        })
        .catch(error => {
            console.log('userController.authenticate - error', error)
            res.status(500).json({
                error: error
            })
        })
}

exports.delete = (req, res, next) => {
    console.log('userController.delete()')
    User.remove({ _id: req.params.userId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'user deleted'
            })
        })
        .catch(error => {
            console.log('userController.delete() - error ', error);
            res.status(500).json({
                error: error
            })
        })
}

exports.getAll = (req, res, next) => {
    console.log('userController.getAll()')
    User.find()
        .select('email password')
        .exec()
        .then(result => {
            console.log('userController.getAll() - result', result);
            res.status(400).json({
                users: result
            })
        })
        .catch(error => {
            console.log('userController.getAll() - error', error)
            res.status(500).json({
                error: error
            })
        })
}