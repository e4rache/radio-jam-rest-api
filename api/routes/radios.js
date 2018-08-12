const express = require('express')
const multer = require('multer')
const radioController = require('../controllers/radioController')

const router = express.Router()

const checkAuth = require('../middleware/check-auth')

router.get('/', radioController.getAll)

router.post('/', checkAuth, radioController.create)

router.get('/:radioId', radioController.get)

router.patch('/:radioId', checkAuth, radioController.update)

router.delete('/:radioId', checkAuth, radioController.delete)

module.exports = router
