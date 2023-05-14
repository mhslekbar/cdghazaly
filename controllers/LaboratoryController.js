const LaboratoryModel = require("../models/LaboratoryModel");


const getLabortories = async (request, response) => {
  try {
    const labo = await LaboratoryModel.find().sort({ createdAt: -1 })
    response.status(200).json({ success: labo })
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}

const createLabortory = async (request, response) => {
  try {
    const { name } = request.body
    const checkLab = await LaboratoryModel.findOne({ name })
    const formErrors = []
    if(checkLab) {
      formErrors.push("Le laboratoire deja existe.")
    }
    if(name.length === 0) {
      formErrors.push("Le nom du laboratoire est obligatoire !!")
    }
    if(formErrors.length === 0) {
      await LaboratoryModel.create(request.body)
      await getLabortories(request, response)
    } else {
      response.status(300).json({ formErrors })
    }
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}

const updateLabortory = async (request, response) => {
  try {
    const { id } = request.params
    const laboratoryData = await LaboratoryModel.findOne({_id: id})
    const { name } = request.body
    const checkLab = await LaboratoryModel.findOne({ _id: {$ne: id}, name })
    const formErrors = []
    if(checkLab) {
      formErrors.push("Le laboratoire deja existe.")
    }
    if(name.length === 0) {
      name = laboratoryData.name
    }
    if(formErrors.length === 0) {
      await LaboratoryModel.updateOne({_id: id}, request.body, {new: true})
      await getLabortories(request, response)
    } else {
      response.status(300).json({ formErrors })
    }
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}


const deleteLabortory = async (request, response) => {
  try {
    const { id } = request.params

    const formErrors = []
    // start check if there's a treatment selled from this lab 
    // end check if there's a treatment selled from this lab 
    if(formErrors.length === 0) {
      await LaboratoryModel.deleteOne({_id: id})
      await getLabortories(request, response)
    } else {
      response.status(300).json({ formErrors })
    }
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}


module.exports = { getLabortories, createLabortory, updateLabortory, deleteLabortory }

