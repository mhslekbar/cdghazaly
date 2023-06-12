const mongoose = require("mongoose")

const patientSchema = new mongoose.Schema({
  doctor: [{
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true 
  }],
  RegNo: { type: Number, default: null },
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  HealthCondition: { type: String },
  dob: { type: Date, required: true },
  assurance: { 
    society: { type: mongoose.Types.ObjectId, ref: "assurance" },
    professionalId: { type: String },
    percentCovered: { type: Number }
  },
  social: { type: Boolean, default: false },
  finish: { type: Boolean, default: false },
  balance: { type: Number, default: 0 },
  date_archive: { type: Date},
  archive: { type: Boolean, default: false},

}, { timestamps: true })

module.exports = mongoose.model("patient", patientSchema)
