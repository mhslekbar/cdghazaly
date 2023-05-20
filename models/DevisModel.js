const mongoose = require("mongoose");

const devisSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "user", required: true },
  patient: { type: mongoose.Types.ObjectId, ref: "patient", required: true },
  numDevis: { type: Number, required: true },
  reduce: { type: Number },
  LineDevis: [{
    doctor: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    treatment: { type: mongoose.Types.ObjectId, ref: "treatment", required: true},
    price: { type: Number, required: true },
    teeth: {  
      // i did this because i have some treamtent needs surface
      // like composite  =>  soins conservatif
      nums: [],
      surface: { type: String, default: "" }
    },
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now},
  }]
}, { timestamps: true })

module.exports = mongoose.model("devis", devisSchema)
