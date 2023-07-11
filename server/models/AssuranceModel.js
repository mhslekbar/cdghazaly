const mongoose = require("mongoose");

const assuranceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cons_price: { type: Number, required: true },
  color: { type: String, required: true },
  invoices: [{
    numInvoice: { type: String, required: true },
    payed: { type: Boolean,  default: false },
    finish: { type: Boolean, default: false },
  }]
}, { timestamps: true });

module.exports = mongoose.model("assurance", assuranceSchema)
