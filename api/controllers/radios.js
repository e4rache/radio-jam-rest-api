const mongoose = require("mongoose");

const Radio = require("../models/radio");

exports.getAll = (req, res, next) => {
  const response = {
    message: "dymmy response"
  };
  res.status(200).json(response);
};
