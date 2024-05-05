const ImplantTreatModel = require("../models/ImplantTreatModel")

const getImplants = async (request, response) => {
  try {
    implants = await ImplantTreatModel
    .find()
      .populate("doctor")
      .populate("patient")
      .populate("treatment")
      .populate("appointment")
    .sort({ createdAt: -1 })
    response.status(200).json({ success: implants })
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}

module.exports = { getImplants}
