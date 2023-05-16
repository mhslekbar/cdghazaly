const mongoose = require("mongoose")

const invoiceSchema = new mongoose.Schema({
  patient: { type: mongoose.Types.ObjectId, ref: "patient", required: true },
  numInvoice: { type: Number, required: true },
  LineInvoice: [{
    doctor: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    treatment: { type: mongoose.Types.ObjectId, ref: "treatment" },
    devis: { type: mongoose.Types.ObjectId, ref: "devis" },
    Acte: { type: String },
    price: { type: Number, required: true },
    teeth: {
      // i did this because i have some treamtent needs surface
      // like composite  =>  soins conservatif
      nums: [],
      surface: []
    },
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now},
  }]
}, { timestamps: true })

module.exports = mongoose.model("invoice", invoiceSchema)
