const mongoose = require("mongoose")

const InvoiceAssurSchema = new mongoose.Schema({
  doctor: { type: mongoose.Types.ObjectId, ref: "user", required: true },
  assurance: { type: mongoose.Types.ObjectId, ref: "assurance", required: true },
  numInvoice: { type:Number, required: true },
  payed: { type:Number, required: true },
}, { timestamps: true })

module.exports = mongoose.model("InvoiceAssurance", InvoiceAssurSchema)
