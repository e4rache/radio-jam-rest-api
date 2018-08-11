const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const fieldSelect = 'name brand model description'

// TODO: externalize key to config file
const JWT_KEY = "ihPwY2TrghWf9OejSuF07DAj4L775YdM0tcxS7o"

exports.create = (req, res, next) => {
    console.log('userController.create')
}

exports.authenticate = (req, res, next) => {
    console.log('userController.authenticate()')
}

exports.delete = (req, res, next) => {
    console.log('userController.delete()')
}

exports.getAll = (req, res, next) => {
    console.log('userController.getAll()')
}