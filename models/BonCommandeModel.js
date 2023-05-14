const mongoose = require("mongoose");

const BonCommandeSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true
  },
  name: {
    type: String, 
    required: true
  },
  reference: {
    type: String,
    required: true
  },
  total: {
    type: Number
  },
  LineBC: [{
    consumable: {
      type: mongoose.Types.ObjectId,
      ref: "consumableList",
      required: true
    },
    qty: { type: Number, required: true }
  }]
}, { timestamps: true })

module.exports = mongoose.model("BonCommande", BonCommandeSchema)

