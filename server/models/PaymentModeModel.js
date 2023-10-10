const mongoose = require("mongoose");

const paymentModeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  archive: { type: Boolean, default: false }
})

module.exports = mongoose.model("paymentMode", paymentModeSchema)

