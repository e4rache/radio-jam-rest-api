const mongoose = require("mongoose");

const Tube = require("../models/tube");

exports.getAll = (req, res, next) => {
  const response = {
    message: "dymmy response"
  };
  res.status(200).json(response);
};
