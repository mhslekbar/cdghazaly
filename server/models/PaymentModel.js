const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "user", required: true },
  doctor: { type: mongoose.Types.ObjectId, ref: "user", required: true },
  patient: { type: mongoose.Types.ObjectId, ref: "patient", required: true },
  amount: { type: Number, required: true },
  type: { type: String, required: true },
  method: { type: mongoose.Types.ObjectId, ref: "paymentMode" },
  supported: { type: String },
  invoiceAssur: { type: mongoose.Types.ObjectId, ref: "assurance.invoices" },
  paymentDate: { type: Date, default: Date.now },
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("payment", paymentSchema)
