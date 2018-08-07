const mongoose = require("mongoose");

const tubeSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true }
});

module.exports = mongoose.model("Tube", tubeSchema);
