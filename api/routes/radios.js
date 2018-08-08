const express = require("express");
const multer = require("multer");

const router = express.Router();

const radioController = require("../controllers/radioController");

router.get("/", radioController.getAll);

router.get("/:radioId", radioController.get);

router.patch("/:radioId", radioController.update);

router.post("/", radioController.create);

router.delete("/:radioId", radioController.delete);

module.exports = router;
