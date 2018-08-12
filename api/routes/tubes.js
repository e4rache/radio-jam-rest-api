const express = require('express')
const multer = require('multer')
const router = express.Router()
const tubeController = require('../controllers/tubeController')
const checkAuth = require('../middleware/check-auth')

router.get('/', tubeController.getAll)

router.post('/', checkAuth, tubeController.create)

router.get('/:tubeId', tubeController.get)

router.patch('/:tubeId', checkAuth, tubeController.update)

router.delete('/:tubeId', checkAuth, tubeController.delete)

module.exports = router;
