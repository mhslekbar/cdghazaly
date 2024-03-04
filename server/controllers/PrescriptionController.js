const PrescriptionModel = require("../models/PrescriptionModel");

const getPrescription = async (request, response) => {
  try {
    const { patient } = request.query
    const prescription = await PrescriptionModel
      .find({ patient })
      .sort({ createdAt: -1 })
    response.status(200).json({ success: prescription })
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}

const createPrescription = async (request, response) => {
  try {
    const { patient, content } = request.body
    const formErrors = []

    if(content.length === 0) {
      formErrors.push("Le contenu est obligatoire.")
    }

    if(formErrors.length === 0) {
      await PrescriptionModel.create({ patient, content })
      request.params.patient = patient
      await getPrescription(request, response)  
    } else {
      response.status(300).json({ formErrors })
    }

  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}

const updatePrescription = async (request, response) => {
  try {
    const { id } = request.params
    const { patient, content } = request.body

    const formErrors = []

    if(content.length === 0) {
      formErrors.push("Le contenu est obligatoire.")
    }

    if(formErrors.length === 0) {
      await PrescriptionModel.updateOne({_id: id}, {patient, content}, {new: true})
      request.params.patient = patient
      await getPrescription(request, response)  
    } else {
      response.status(300).json({ formErrors })
    }


  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}

const deletePrescription = async (request, response) => {
  try {
    const { id } = request.params

    const prescription = await PrescriptionModel.findOne({ _id: id })

    const formErrors = []
    // start check if there's a treatment selled from this lab 
    // end check if there's a treatment selled from this lab 
    if(formErrors.length === 0) {
      await PrescriptionModel.deleteOne({_id: id})
      request.params.patient = prescription.patient
      await getPrescription(request, response)
    } else {
      response.status(300).json({ formErrors })
    }
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}

module.exports = { getPrescription, createPrescription, updatePrescription, deletePrescription }

