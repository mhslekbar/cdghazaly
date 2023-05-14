const mongoose = require("mongoose");

const assuranceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cons_price: { type: Number, required: true },
  color: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("assurance", assuranceSchema)
