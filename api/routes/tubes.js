const express = require("express");
const multer = require("multer");

const router = express.Router();

const tubesController = require("../controllers/tubes");

router.get("/", tubesController.getAll);

module.exports = router;
