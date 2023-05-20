const mongoose = require("mongoose")

const setAppointSchema = new mongoose.Schema({
  doctor: { type: mongoose.Types.ObjectId, ref: "user", required: true },
  start: { type: String, required: true },  
  end: { type: String, required: true },
  time: { type: String, required: true },
  countSeance: { type: Number, required: true },
  partOfTime: { type: String, required: true },
}, { timestamps: true })

module.exports = mongoose.model("setAppointment", setAppointSchema)
