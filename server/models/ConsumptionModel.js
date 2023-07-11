const mongoose = require("mongoose")

const consumptionSchema = new mongoose.Schema({
  doctor: { type: mongoose.Types.ObjectId, ref: "user" },
  note: { type: String },
  amount: { type: Number, required: true },
}, { timestamps: true })

module.exports = mongoose.model("consumption", consumptionSchema)
