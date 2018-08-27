const mongoose = require("mongoose");

const radioSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  brand: { type: String, required: true },
  model: { type: String },
  serialNumber: { type: String },
  description: { type: String }
});

module.exports = mongoose.model("Radio", radioSchema);
