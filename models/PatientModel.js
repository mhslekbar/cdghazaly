const mongoose = require("mongoose")

const patientSchema = new mongoose.Schema({
  doctor: [{
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true 
  }],
  matricule: { type: Number, default: null },
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  HealthCondition: { type: String },
  dob: { type: Date, required: true },
  approve: { type: Number, default: 0 },
  assurance: { 
    society: { type: mongoose.Types.ObjectId, ref: "assurance" },
    professionalId: { type: String },
    percentCovered: { type: Number }
  },
  social: { type: Number, default: 0 },
  finish: { type: Number, default: 0 },
  balance: { type: Number, default: 0 },
  date_archive: { type: Date},
  archive: { type: Number, default: 0},

}, { timestamps: true })

module.exports = mongoose.model("patient", patientSchema)
