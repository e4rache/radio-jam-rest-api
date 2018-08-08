const express = require("express");
const multer = require("multer");

const router = express.Router();

const tubeController = require("../controllers/tubeController");

router.get("/", tubeController.getAll);

router.post("/", tubeController.create);

router.get("/:tubeId", tubeController.get);

router.patch("/:tubeId", tubeController.update);

router.delete("/:tubeId", tubeController.delete);

module.exports = router;
