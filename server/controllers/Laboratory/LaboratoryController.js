const LaboratoryModel = require("../../models/LaboratoryModel");
const UserModel = require("../../models/UserModel");

const getLabortories = async (request, response) => {
  try {
    let labo
    labo = await LaboratoryModel.find()
      .populate("accounts.doctor")
      .populate("treatments.treatment")
      .populate("payments.doctor")
      .populate("consumptions.doctor")
      .populate("consumptions.patient")
      .populate("patients.patient")
      .populate("patients.appointment")
    // .populate("patients.consumptionLab")
    .sort({ createdAt: -1 })
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
      const newLab = await LaboratoryModel.create(request.body)
      const users = await UserModel.find()
      for(let user of users) {
        if(JSON.stringify(user.doctor) !== '{}') {
          newLab.accounts.push({ doctor: user._id })
        }
      }
      await newLab.save()
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


const getAccountsLab = async (request, response) => {
  try {
    const { labId } = request.params
    const laboratory = await LaboratoryModel
    .findOne({ _id: labId }, {_id: 1, name: 1, phone: 1, createdAt: 1, accounts: 1})
    .populate("accounts.doctor")
    response.status(200).json({ success: laboratory.accounts })
  } catch(err) {
    response.status(500).json({ err:err.message })
  }
}

const getConsumptionsLab = async (request, response) => {
  try {
    const { patient, labId } = request.body

    let consumptionLab
    if(patient) {
      consumptionLab = await LaboratoryModel
        .find({ "consumptions.patient": patient }, {_id: 1, name: 1, phone: 1, createdAt: 1, consumptions: 1})
        .populate("consumptions.doctor")
        .populate("consumptions.treatment")
        .populate("consumptions.patient")
        // consumptionLab = consumptionLab.consumptions
    } else if(labId) {
      consumptionLab = await LaboratoryModel
        .findOne({ _id: labId }, { consumptions: 1 })
        .populate("consumptions.doctor")
        .populate("consumptions.treatment")
        .populate("consumptions.patient")
        consumptionLab = consumptionLab.consumptions
    }  else {
      consumptionLab = await LaboratoryModel
      .find({ }, {_id: 1, name: 1, phone: 1, createdAt: 1, consumptions: 1})
      .populate("consumptions.doctor")
      .populate("consumptions.treatment")
      .populate("consumptions.patient")
      consumptionLab = consumptionLab.map((lab) => ({consumptions: lab.consumptions}))
    }
    response.status(200).json({ success: consumptionLab })
  } catch(err) {
    console.log("err: ", err)
    response.status(500).json({ err:err.message })
  }
}

// patients who use laboratory prostheses
const getPatientsLab = async (request, response) => {
  try {
    const { labId } = request.params
    const laboratory = await LaboratoryModel
      .findOne({ _id: labId }, { patients: 1, consumptions: 1 })
      .populate("patients.appointment")
      .populate("consumptions.doctor")
      .populate("consumptions.treatment")
      .populate("consumptions.patient")
    const patientWithConsumptions = laboratory.patients.map(patient => {
      const consumptionData =  laboratory.consumptions.find(cons => cons._id.equals(patient.consumptionLab))
      return {
        _id: patient._id,
        consumptionLab: consumptionData, 
        appointment: patient.appointment, 
        fingerPrintDate: patient.fingerPrintDate, 
        finish: patient.finish, 
        createdAt: patient.createdAt, 
        updatedAt: patient.updatedAt
      } 
    })
    
    response.status(200).json({ success: patientWithConsumptions })
  } catch(err) {
    response.status(500).json({ err:err.message })
  }
}

const finishPatientLab = async (request, response) => {
  try {
    const { labId, patientLabId } = request.params
    const laboratory = await LaboratoryModel.findOne({ _id: labId })
    const patientLabIndex = laboratory.patients.findIndex(patient => patient._id.equals(patientLabId))
    if(patientLabIndex > -1) {
      laboratory.patients[patientLabIndex].finish = true
    }
    await laboratory.save()
    await getPatientsLab(request, response)
  } catch (err) {
    response.status(500).json({ err:err.message })
  }
}



module.exports = { 
  getLabortories, createLabortory, updateLabortory, deleteLabortory,
  getPatientsLab, finishPatientLab,
  getAccountsLab, getConsumptionsLab
}

