const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
  patient: { type: mongoose.Types.ObjectId, ref: "patient", required: true },
  content: { type: String },
}, { timestamps: true })

module.exports = mongoose.model("prescription", prescriptionSchema)
