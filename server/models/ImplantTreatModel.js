const mongoose = require("mongoose");

const ImplantTreatSchema = new mongoose.Schema({
  doctor: { type: mongoose.Types.ObjectId, ref: "user", required: true },
  patient: { type: mongoose.Types.ObjectId, ref: "patient", required: true },
  treatment: { type: mongoose.Types.ObjectId, ref: "treatment" },
  price: { type: Number, required: true },
  teeth: {
    nums: [],
    surface: { type: String, default: "" }
  },
  appointment: { type: mongoose.Types.ObjectId, ref: "appointment" },
  isSetAppointment: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("implant_treat", ImplantTreatSchema)
