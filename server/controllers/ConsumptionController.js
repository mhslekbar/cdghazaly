const ConsumptionModel = require("../models/ConsumptionModel")

const getConsumptions = async (request, response) => {
  try {
    const { doctor } = request.body
    let consumption
    if(doctor) {
      consumption = await ConsumptionModel
      .find({ doctor })
      .populate("doctor")
      .sort({ createdAt: -1 })
    } else {
      consumption = await ConsumptionModel
      .find()
      .populate("doctor")
      .sort({ createdAt: -1 })
    }
    response.status(200).json({ success: consumption })
   } catch (error) {
    response.status(500).json({ error: error.message })
  }
}

const createConsumption = async (request, response) => {
  try {
    const { doctor, note, amount } = request.body
    const formErrors = []
    if(amount.length === 0 || amount === 0) {
      formErrors.push("Le montant est obligatoire ")
    }

    if(formErrors.length === 0) {
      await ConsumptionModel.create({ doctor, note, amount })
      await getConsumptions(request, response)
    }else {
      response.status(300).json({ formErrors })
    }
  } catch(error) {
    response.status(500).json({ error: error.message })
  }
}

const updateConsumption = async (request, response) => {
  try {
    const { id } = request.params
    const { doctor, note, amount } = request.body
    const formErrors = []
    if(amount.length === 0 || amount === 0) {
      formErrors.push("Le montant est obligatoire ")
    }
    if(formErrors.length === 0) {
      let updateData = doctor ? { doctor, note, amount } : { $unset: { doctor: 1 }, note, amount }
      await ConsumptionModel.updateOne({ _id: id }, updateData, { new: true })
      await getConsumptions(request, response)
    }else {
      response.status(300).json({ formErrors })
    }
  } catch(error) {
    response.status(500).json({ error: error.message })
  }
}

const deleteConsumption = async (request, response) => {
  try {
    const { id } = request.params
    await ConsumptionModel.deleteOne({ _id: id })
    await getConsumptions(request, response)
  } catch(error) {
    response.status(500).json({ error: error.message })
  }
}

module.exports = { getConsumptions, createConsumption, updateConsumption, deleteConsumption }
