const mongoose = require("mongoose")

const setAppointSchema = new mongoose.Schema({
  doctor: { type: mongoose.Types.ObjectId, ref: "user", required: true },
  start: { type: Date, required: true },  
  end: { type: Date, required: true },
  time: { type: Date, required: true },
  countSeance: { type: Number, required: true },
  partOfTime: { type: String, required: true },
}, { timestamps: true })

module.exports = mongoose.model("setAppointment", setAppointSchema)
