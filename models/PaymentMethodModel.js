const mongoose = require("mongoose");

const paymentMethodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  archive: { type: Number, default: 0 }
})

module.exports = mongoose.model("paymentMethod", paymentMethodSchema)

