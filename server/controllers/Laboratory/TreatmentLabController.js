const LaboratoryModel = require("../../models/LaboratoryModel");

const getTreatmentsLab = async (request, response) => {
  try {
    const { labId } = request.params
    let labo = await LaboratoryModel
    .findOne({ _id: labId }, { _id: 1, name: 1, phone: 1, createdAt: 1, treatments: 1 })
    .populate("treatments.treatment")
    response.status(200).json({ success: labo.treatments })
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}

const createTreatmentLab = async (request, response) => {
  try {
    const { labId } = request.params
    const { treatment, price } = request.body

    const laboratory = await LaboratoryModel.findOne({ _id: labId })
    const formErrors = []

    if(laboratory.treatments.find(treat => treat.treatment.equals(treatment))) {
      formErrors.push("le treatment deja exite")
    }
    if(treatment.length === 0) {
      formErrors.push("Donner le traitment")
    }
    if(price.length === 0) {
      formErrors.push("Donner le prix")
    }
    if(formErrors.length === 0) {
      laboratory.treatments.push({ treatment, price })
      await laboratory.save()
      await getTreatmentsLab(request, response)
    } else {
      response.status(300).json({ formErrors })
    }
  } catch (err) {
    console.log(err)
    response.status(500).json({ err: err.message })
  }
}

const updateTreatmentLab = async (request, response) => {
  try {
    const { labId, treatmentId } = request.params
    const { treatment, price } = request.body
    const laboratory = await LaboratoryModel.findOne({ _id: labId })
    const formErrors = []
    if(laboratory.treatments.find(treat => treat.treatment.equals(treatment) && !treat._id.equals(treatmentId))) {
      formErrors.push("le traitment deja exite")
    }    
    const findIndex = laboratory.treatments.findIndex(treat => treat._id.equals(treatmentId))
    if(findIndex === -1) {
      formErrors.push("treatmentId wrong !!")
    }
    if(formErrors.length === 0) {
      laboratory.treatments[findIndex] = {
        _id: laboratory.treatments[findIndex]._id,
        updatedAt: laboratory.treatments[findIndex].updatedAt,
        createdAt: laboratory.treatments[findIndex].createdAt,
        treatment, 
        price
      }
      await laboratory.save()
      await getTreatmentsLab(request, response)
    } else {
      response.status(300).json({ formErrors })
    }

  } catch (err) {
    response.status(500).json({ err: err.message })
  }
}


const deleteTreatmentLab = async (request, response) => {
  try {
    const { labId, treatmentId } = request.params
    const laboratory = await LaboratoryModel.findOne({ _id: labId })
    const formErrors = []

    if(formErrors.length === 0) {
      laboratory.treatments = laboratory.treatments.filter(treat => !treat._id.equals(treatmentId))
      await laboratory.save()
      await getTreatmentsLab(request, response)
    } else {
      response.status(300).json({ formErrors })
    }

  } catch (err) {
    response.status(500).json({ err: err.message })
  }
}

module.exports = { getTreatmentsLab, createTreatmentLab, updateTreatmentLab, deleteTreatmentLab }