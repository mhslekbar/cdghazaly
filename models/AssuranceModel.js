const mongoose = require("mongoose");

const assuranceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cons_price: { type: Number, required: true },
  color: { type: String, required: true },
  invoices: [{
    doctor: [{ type: mongoose.Types.ObjectId, ref: "user", required: true }],
    inCommon: { type: Boolean,  default: false },
    numInvoice: { type: String, required: true },
    payed: { type: Number,  default: 0 },
    finish: { type: Number, default: 0 },
  }]
}, { timestamps: true });

module.exports = mongoose.model("assurance", assuranceSchema)
