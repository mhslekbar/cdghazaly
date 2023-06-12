const mongoose = require("mongoose");

const consumptionSchema = new mongoose.Schema({
  laboratory: { type: mongoose.Types.ObjectId, ref: "laboratory" },
  doctor: { type: mongoose.Types.ObjectId, ref: "user" },
  patient: { type: mongoose.Types.ObjectId, ref: "patient" },
  treatment: { type: mongoose.Types.ObjectId, ref: "treatment" },
  price: { type: Number, required: true },
  teeth: {
    nums: [],
    surface: { type: String, default: "" }
  },
}, { timestamps: true });

module.exports = consumptionSchema

// module.exports = mongoose.model("laboratory_consumption", consumptionSchema)
