const mongoose = require("mongoose");

const laboratorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: Number },
  // labo treatment
  treaments: [{
    treat: { type: mongoose.Types.ObjectId, ref: "treatment" },
    price: { type: Number},
  }],
  // labo account
  accounts: [{
    doctor: { type: mongoose.Types.ObjectId, ref: "user" },
    balance: { type: Number },
  }],
  // labo versement
  payments: [{
    doctor: { type: mongoose.Types.ObjectId, ref: "user" },
    comment: { type: String },
    amount: { type: Number },
  }],
  // conso lab
  consumptions: [{
    doctor: { type: mongoose.Types.ObjectId, ref: "user" },
    patient: { type: mongoose.Types.ObjectId, ref: "patient" },
    treat: { type: mongoose.Types.ObjectId, ref: "treatment" },
    teeth: {
      nums: [],
      surface: []
     },
    price: { type: Number, required: true },
    qty: { type: Number, required: true }
  }],
  // patients Lab
  patients: [{
    consoId: { type: mongoose.Types.ObjectId, ref: "laboratory.consumptions" },
    appointment: { type: mongoose.Types.ObjectId, ref: "appointment", },
    finish: { type: Number, default: 0 }
  }]
}, { timestamps: true });

module.exports = mongoose.model("laboratory", laboratorySchema)


// const dentSchema = new mongoose.Schema({
//   tooth: { type: String },
//   surface: { type: String },
//   // ... other fields
// });