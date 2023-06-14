const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "user", required: true },
  doctor: { type: mongoose.Types.ObjectId, ref: "user", required: true },
  patient: { type: mongoose.Types.ObjectId, ref: "patient", required: true },
  amount: { type: Number, required: true },
  type: { type: String, required: true },
  method: { type: mongoose.Types.ObjectId, ref: "paymentMethod" },
  supported: { type: String },
  invoiceAssur: { type: mongoose.Types.ObjectId, ref: "assurance.invoices" },
}, { timestamps: true })

module.exports = mongoose.model("payment", paymentSchema)
