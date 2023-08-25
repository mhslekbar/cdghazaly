const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String },
  accounts: [{
    doctor: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    balance: { type: Number, default: 0 },
  }],
  historyPayment: [{
    payment: { type: Number },
    purchaseOrderId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "PurchaseOrder"
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}]
}, { timestamps: true });

module.exports = mongoose.model("supplier", supplierSchema)
