const mongoose = require("mongoose");

const Radio = require("../models/radio");

const fieldSelect = "name brand model description";

exports.getAll = (req, res, next) => {
  Radio.find()
    .select(fieldSelect)
    .exec()
    .then(radios => {
      const response = {
        count: radios.length,
        radios
      };
      res.status(200).json(response);
    })
    .catch(error => {
      console.log(`radioController.getAll() ${error}`);
      res.status(500).json({
        error
      });
    });
};

//           /--------------------
//----------       C.R.U.D.
//           \--------------------

exports.get = (req, res, next) => {
  const id = req.params.radioId;
  Radio.findById(id)
    .select(fieldSelect)
    .exec()
    .then(radio => {
      if (radio) {
        res.status(200).json({
          radio
        });
      } else {
        res.status(404).json({
          message: `no radio found with id : ${id}`
        });
      }
    })
    .catch(error => {
      console.log(`radioController.get() ${error}`);
      res.status(500).json({ error });
    });
};

exports.create = (req, res, next) => {
  const { name, brand, model, description } = req.body;
  const radio = new Radio({
    _id: new mongoose.Types.ObjectId(),
    name,
    brand,
    model,
    description
  });

  radio
    .save()
    .then(newRadio => {
      console.log("radioController.create() - newRadion", newRadio);
      res.status(201).json({
        message: "new radio created",
        radio
      });
    })
    .catch(error => {
      console.log("radioController.create() - error", error);
      res.status(500).json({ error });
    });
};

exports.update = (req, res, next) => {
  const id = req.params.radioId;
  console.log(`radioController.update() - id`, id);
  const updateOps = {};

  for (const ops of req.body) {
    console.log(`updateOps[${ops.propName}] = ${ops.propValue}`);
    updateOps[ops.propName] = ops.propValue;
  }
  console.log(`radioController.update() - updateOps`, updateOps);
  Radio.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log("radioController.update() - result", result);
      res.status(200).json({
        message: "radio updated"
      });
    })
    .catch(error => {
      console.log(`radioController.update() - ${error}`);
      res.status(500).json({ error });
    });
};

exports.delete = (req, res, next) => {
  const id = req.params.radioId;
  Radio.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "radio deleted"
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error
      });
    });
};