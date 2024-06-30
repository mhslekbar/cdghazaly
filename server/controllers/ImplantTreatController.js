const ImplantTreatModel = require("../models/ImplantTreatModel")

const getImplants = async (request, response) => {
  try {
    const { doctor } = request.query
    implants = await ImplantTreatModel
    .find({ doctor })
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

const finishImplant = async (request, response) => {
  try {
    const { id } = request.params
    await ImplantTreatModel.updateOne({ _id: id }, { isSetAppointment: true })
    await getImplants(request, response)
  } catch (err) {
    response.status(500).json({ err:err.message })
  }
}
module.exports = { getImplants, finishImplant}
