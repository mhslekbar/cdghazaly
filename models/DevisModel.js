const mongoose = require("mongoose");

const devisSchema = new mongoose.Schema({
  doctor: { type: mongoose.Types.ObjectId, ref: "user", required: true },
  patient: { type: mongoose.Types.ObjectId, ref: "patient", required: true },
  numDevis: { type: Number, required: true },
  reduce: { type: Number, required: true },
  LineDevis: [{
    doctor: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    treatment: { type: mongoose.Types.ObjectId, ref: "treatment", required: true},
    teeth: {  
      // i did this because i have some treamtent needs surface
      // like composite  =>  soins conservatif
      nums: [],
      surface: []
    },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
    accept: { type: Number, required: true },
  }]
}, { timestamps: true })

module.export = mongoose.model("devis", devisSchema)
