const mongoose = require("mongoose");

const laboratorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String },
  // labo treatment 
  treatments: [{
    treatment: { type: mongoose.Types.ObjectId, ref: "treatment" },
    price: { type: Number},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }],
  // every doctor has own account of laboratory
  accounts: [{
    doctor: { type: mongoose.Types.ObjectId, ref: "user" },
    balance: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }],
  
  // laboratory versement
  payments: [{
    doctor: { type: mongoose.Types.ObjectId, ref: "user" },
    comment: { type: String },
    amount: { type: Number },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }],
  // conso laboratory
  consumptions: [{
    doctor: { type: mongoose.Types.ObjectId, ref: "user" },
    patient: { type: mongoose.Types.ObjectId, ref: "patient" },
    treatment: { type: mongoose.Types.ObjectId, ref: "treatment" },
    price: { type: Number, required: true },
    teeth: {
      nums: [],
      surface: { type: String, default: "" }
    },
     createdAt: { type: Date, default: Date.now },
     updatedAt: { type: Date, default: Date.now }
  }],
  // patients laboratory
  // patients who use laboratory => treat protheses
  patients: [{
    patient: { type: mongoose.Types.ObjectId, ref: "patient" },
    consumptionLab: { type: mongoose.Types.ObjectId, ref: "laboratory.consumptions" },
    appointment: { type: mongoose.Types.ObjectId, ref: "appointment" },
    fingerPrintDate: { type: Date },
    finish: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model("laboratory", laboratorySchema)



// const dentSchema = new mongoose.Schema({
//   tooth: { type: String },
//   surface: { type: String },
//   // ... other fields
// });