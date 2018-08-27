const mongoose = require("mongoose");

const Radio = require("../models/radio");

const fieldSelect = "brand model serialNumber description";

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
  console.log('radioController.create() - req.body', req.body)
  const { brand, model, serialNumber, description } = req.body;
  const radio = new Radio({
    _id: new mongoose.Types.ObjectId(),
    brand,
    model,
    serialNumber,
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
  //console.log(`radioController.update() - req.headers`, req.headers);
  //console.log(`radioController.update() - req.body`, req.body);
  //console.log(`radioController.update() - req.params`, req.params);

  let radioOps = req.body;
  //console.log(`radioController.update() - radioOps`, radioOps);
  delete radioOps["_id"];
  console.log(`radioController.update() - radioOps`, radioOps);

  Radio.update({ _id: id }, { $set: radioOps })
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
