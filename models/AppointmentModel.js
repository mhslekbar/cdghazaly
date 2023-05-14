const mongoose = require("mongoose")

const appointmentSchema = new mongoose.Schema({
  doctor: { type: mongoose.Types.ObjectId, ref: "user", required: true },
  patient: { type: mongoose.Types.ObjectId, ref: "patient", required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  numSeance: { type: Number, required: true },
  partOfTime: { type: String, required: true }
}, { timestamps: true })

module.exports = mongoose.model("appointment", appointmentSchema)
