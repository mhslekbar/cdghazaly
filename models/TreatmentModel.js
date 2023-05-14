const mongoose = require("mongoose");

const treatmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  assurance: { type: mongoose.Types.ObjectId, ref: "assurance" },
})

module.exports = mongoose.model("treatment", treatmentSchema)
