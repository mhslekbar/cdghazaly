const mongoose = require("mongoose")

const invoiceSchema = new mongoose.Schema({
  doctor: { type: mongoose.Types.ObjectId, ref: "user", required: true },
  patient: { type: mongoose.Types.ObjectId, ref: "patient", required: true },
  numInvoice: { type: Number, required: true },
  LineInvoice: [{
    treatment: { type: mongoose.Types.ObjectId, ref: "treatment" },
    devis: { type: mongoose.Types.ObjectId, ref: "devis" },
    Acte: { type: String },
    price: { type: Number, required: true },
    qty: { type: Number },
    teeth: {  
      // i did this because i have some treamtent needs surface
      // like composite  =>  soins conservatif
      nums: [],
      surface: []
    }
  }]
}, { timestamps: true })

module.exports = mongoose.model("invoice", invoiceSchema)
