const PaymentModel = require("../models/PaymentModel")
const PatientModel = require("../models/PatientModel")
const FicheModel = require("../models/FicheModel")

const getPayments = async (request, response) => {
  try {
    const { patient, type } = request.query
    let payments
    if(type) {
      payments = await PaymentModel.find({ patient, type }).sort({ createdAt: -1 })
    } else {
      payments = await PaymentModel.find({ patient }).sort({ createdAt: -1 })
    }
    response.status(200).json({ success: payments })
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}

const createPayment = async (request, response) => {
  try {
    // versement
    const { doctor, patient, amount, method, supported } = request.body
    const formErrors = []
    if(amount.length === 0) {
      formErrors.push("donner le montant")
    }
    if(formErrors.length === 0) {
      let latestPatient = await PatientModel
        .findOne({ RegNo: { $not: { $type: 10 } } })
        .sort({ RegNo: -1 })
      let prevMatricule = latestPatient.RegNo || 0
      if(!latestPatient.RegNo) {
        let newMatricule  = prevMatricule + 1
        let patientInfo   = await PatientModel.findOne({ _id: patient })
        patientInfo.RegNo = newMatricule
        patientInfo.save()
        let LineFiche = []
        for(let i=1; i<=15; i++) {
          LineFiche.push({ })
        }
        await FicheModel.create({ doctor, patient, numFiche: 1, LineFiche })
      }
      await PaymentModel.create({ user: doctor, doctor, type: "versement", patient, amount, method, supported })
      await getPayments(request, response)
    } else {
      response.status(300).json({ formErrors })
    }
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}

const updatePayment = async (request, response) => {
  try {
    // versement
    const { id } = request.params
    const { doctor, patient, amount, method, supported } = request.body
    const formErrors = []
    const paymentInfo = await PaymentModel.findOne({_id: id})
    if(amount.length === 0 || amount === 0) {
      amount = paymentInfo.amount
    }
    if(formErrors.length === 0) {
      await PaymentModel.updateOne({_id: id}, { user: doctor, doctor, type: "versement", patient, amount, method, supported })
      await getPayments(request, response)
    } else {
      response.status(300).json({ formErrors })
    }
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}


const deletePayment = async (request, response) => {
  try {
    const { id } = request.params
    const { patient } = await PaymentModel.findOne({ _id: id })
    request.body.patient = patient

    await PaymentModel.deleteOne({_id: id})
    await getPayments(request, response)
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}


module.exports = { getPayments, createPayment, updatePayment, deletePayment }