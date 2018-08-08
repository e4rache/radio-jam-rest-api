const mongoose = require("mongoose");

const Tube = require("../models/tube");

exports.getAll = (req, res, next) => {
  const response = {
    message: "dymmy response"
  };
  res.status(200).json(response);
};

//           /--------------------
//----------       C.R.U.D.
//           \--------------------

exports.create = (req, res, next) => {
  console.log("tubeController.create() - not implemented");
};

exports.get = (req, res, next) => {
  console.log("tubeController.get() - not implemented");
};

exports.update = (req, res, next) => {
  console.log("tubeController.update() - not implemented");
};

exports.delete = (req, res, next) => {
  console.log("tubeController.delete() - not implemented");
};
