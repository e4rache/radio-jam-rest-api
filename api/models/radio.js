const mongoose = require("mongoose");

const radioSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  brand: { type: String },
  model: { type: String },
  description: { type: String }
});

module.exports = mongoose.model("Radio", radioSchema);
