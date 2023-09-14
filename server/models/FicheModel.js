const mongoose = require("mongoose");

const ficheSchema = new mongoose.Schema({
  patient: { type: mongoose.Types.ObjectId, ref: "patient", required: true },
  numFiche: { type: Number, required: true },
  LineFiche: [{
    doctor: { type: mongoose.Types.ObjectId, ref: "user" },
    dateAppointment: { type: Date, default: null },
    acte: { type: String },
    amount: { type: Number },
    finish: { type: Number, default: 0 },
    payment: { type: mongoose.Types.ObjectId, ref: "payment" },
    consumptionLab: { type: mongoose.Types.ObjectId, ref: "laboratory.consumptions" },
    lineInvoice: { type: mongoose.Types.ObjectId, ref: "invoice.LineInvoice" },
    appointment: { type: mongoose.Types.ObjectId, ref: "appointment" },
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now},
  }]
}, { timestamps: true })

module.exports = mongoose.model("fiche", ficheSchema)
// patientLab: { type: mongoose.Types.ObjectId, ref: "laboratory.patients" },
