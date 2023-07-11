const mongoose = require("mongoose");

const PurchaseOrderSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true
  },
  num: {
    type: String, 
    required: true
  },
  reference: {
    type: String,
  },
  total: {
    type: Number
  },
  LinePurchaseOrder: [{
    consumable: {
      type: mongoose.Types.ObjectId,
      ref: "consumableList",
      required: true
    },
    qty: { type: Number, required: true }
  }]
}, { timestamps: true })

module.exports = mongoose.model("PurchaseOrder", PurchaseOrderSchema)

