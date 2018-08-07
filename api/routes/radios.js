const express = require("express");
const multer = require("multer");

const router = express.Router();

const radiosController = require("../controllers/radios");

router.get("/", radiosController.getAll);

module.exports = router;
