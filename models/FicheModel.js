const mongoose = require("mongoose");

const ficheSchema = new mongoose.Schema({
  patient: { type: mongoose.Types.ObjectId, ref: "patient", required: true },
  numFiche: { type: Number, required: true },
  LineFiche: [{
    doctor: { type: mongoose.Types.ObjectId, ref: "user" },
    dateAppointment: { type: Date },
    acte: { type: String },
    amount: { type: Number },
    facture: { type: Number },
    appointment: { type: mongoose.Types.ObjectId, ref: "appointment" },
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now},
  }]
}, { timestamps: true })

module.exports = mongoose.model("fiche", ficheSchema)
