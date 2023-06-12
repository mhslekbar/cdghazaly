const PatientModel = require("../models/PatientModel");
const PaymentModel = require("../models/PaymentModel");
const AssuranceModel = require("../models/AssuranceModel");
const SettingModel = require("../models/SettingModel");

const getPatients = async (request, response) => {
  try {
    const patients = await PatientModel.find().populate("doctor").sort({ RegNo: -1 })
    response.status(200).json({ success: patients })
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}

const createPatient = async (request, response) => {
  try {
    let { 
      user, doctor, name, phone, HealthCondition,
      yearOfBirth, assurance, social, method, supported
    } = request.body
    let { cons_price } = await SettingModel.findOne()
    let dob = new Date()
    let date_archive = new Date()
    date_archive.setMonth(date_archive.getMonth() + 1)

    const checkPatient = await PatientModel.findOne({ name, phone })
    if(checkPatient) {
      return response.status(200).json({ existPatient: true })
    }

    const formErrors = []
    if(doctor.length === 0) {
      formErrors.push("Le doctor est obligatoire.")
    }
    if(name.length === 0) {
      formErrors.push("Le name du patient est obligatoire.")
    }
    if(phone.length === 0) {
      formErrors.push("Le telephone du patient est obligatoire.")
    }
    if(HealthCondition.length === 0) {
      formErrors.push("L'état de santé du patient est obligatoire.")
    } 
    if(yearOfBirth.length === 0) {
      formErrors.push("Année de naissance du patient est obligatoire.")
    } else {
     dob.setFullYear(yearOfBirth)
    }
    if(assurance) {
      let { society } = assurance
      const societyInfo = await AssuranceModel.findOne({_id: society})
      cons_price = societyInfo.cons_price
    }
    if(social) {
      cons_price = 0
    }

    if(formErrors.length === 0) {
      const newPatient = await PatientModel.create({ doctor: [doctor], name, phone, HealthCondition, dob, assurance, social, date_archive})
      await PaymentModel.create({ user, doctor, patient: newPatient._id, amount: cons_price, type: "consultation", method, supported })
      await getPatients(request, response)
    } else {
      response.status(300).json({ formErrors })
    }
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}

const updatePatient = async (request, response) => {
    try {
    const { id } = request.params
    let { 
      doctor, name, phone, HealthCondition,
      dob, assurance, social, method, supported
    } = request.body

    const patientInfo = await PatientModel.findOne({_id: id})
    const paymentInfo = await PaymentModel.findOne({ patient: id })
    let cons_price = paymentInfo.amount

    const formErrors = []
    if(doctor.length === 0) {
      doctor = patientInfo.doctor
    }
    if(name.length === 0) {
      name = patientInfo.name
    }
    if(phone.length === 0) {
      phone = patientInfo.phone
    }
    if(HealthCondition.length === 0) {
      HealthCondition = patientInfo.HealthCondition
    } 
    if(dob.length === 0) {
      dob = patientInfo.dob
    }
    if(assurance.length === 0) {
      assurance = patientInfo.assurance
    }
    if(social.length === 0) {
      social = patientInfo.social
    }

    if(Object.keys(assurance).length > 0) {
      let { society } = assurance
      const societyInfo = await AssuranceModel.findOne({_id: society})
      cons_price = societyInfo.cons_price
    } else {
      let SettingInfo = await SettingModel.findOne()
      cons_price = SettingInfo.cons_price
    }
    if(social) {
      cons_price = 0
    }
    if(formErrors.length === 0) {
      await PatientModel.updateOne({_id: id}, { doctor, name, phone, HealthCondition, dob, assurance, social }, { new: true })
      // Start Edit payment
      paymentInfo.amount = cons_price
      paymentInfo.method = method
      paymentInfo.supported = supported
      paymentInfo.save()
      // END Edit payment
      await getPatients(request, response)
    } else {
      response.status(300).json({ formErrors })
    }
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}

const deletePatient = async (request, response) => {
  try {
    const { id } = request.params
    await PatientModel.deleteOne({ _id: id})
    await PaymentModel.deleteOne({ patient: id})
    await getPatients(request, response)
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}


module.exports = { getPatients, createPatient, updatePatient, deletePatient }

