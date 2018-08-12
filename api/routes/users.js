const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const checkAuth = require('../middleware/check-auth')

router.post('/create', checkAuth, userController.create)

router.post('/login', userController.authenticate)

router.delete('/:userId', checkAuth, userController.delete)

router.get('/', checkAuth, userController.getAll)

module.exports = router
