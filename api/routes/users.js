const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/create', userController.create)

router.post('/login', userController.authenticate)

router.delete('/:userId', userController.delete)

router.get('/', userController.getAll)

module.exports = router
