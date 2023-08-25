const mongoose = require("mongoose");

const PurchaseOrderSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true
  },
  supplier: {
    type: mongoose.Types.ObjectId,
    ref: "supplier",
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
  paymentDate: { type: Date, default: null },
  LinePurchaseOrder: [{
    consumable: {
      type: mongoose.Types.ObjectId,
      ref: "consumableList",
      required: true
    },
    qty: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true })

module.exports = mongoose.model("PurchaseOrder", PurchaseOrderSchema)

