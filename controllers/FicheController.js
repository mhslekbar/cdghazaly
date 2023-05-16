const FicheModel = require("../models/FicheModel")
const PaymentModel = require("../models/PaymentModel")
const InvoiceModel = require("../models/InvoiceModel")
const TreatmentModel = require("../models/TreatmentModel")
const LaboratoryModel = require("../models/LaboratoryModel")

const getFiches = async (request, response) => {
  try {
    const { patient } = request.params
    const fiches = await FicheModel.find({ patient }).sort({ createdAt: -1 })
    response.status(200).json({ success: fiches })
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}

const createFiche = async (request, response) => {
  try {
    const { patient } = request.params
    const ficheData = await FicheModel.findOne({ patient }).sort({ numFiche: -1 })

    let numFiche = ficheData?.numFiche || 0
    numFiche++;
    let LineFiche = []
    for(let i=1; i<=15; i++) {
      LineFiche.push({})
    }
    await FicheModel.create({ patient, numFiche, LineFiche})
    await getFiches(request, response)
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}

const updateFiche = async (request, response) => {
  try {
    const { id } = request.params
    const { LineFiche } = request.body

    const FicheInfo = await FicheModel.findOne({ _id: id })
    FicheInfo.LineFiche = LineFiche
    await FicheInfo.save()
    await getFiches(request, response)
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}

const deleteFiche = async (request, response) => {
  try {
    const { id } = request.params
    await FicheModel.deleteOne({ _id: id })
    await getFiches(request, response)
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}

const createLineFiche = async (request, response) => {
  try {
    const { patient, ficheId } = request.params
    const { user, doctor, treatment, acte, price, teeth, devis, lineFicheId, laboratory } = request.body
    const amount = price * Number(teeth.nums.length)
    console.log(amount)
    // start create the payment
    const newPayment = await PaymentModel.create({ user, doctor, patient, amount, type: "soins" })

    // start Add treatment in conso lab if prothese
    const treatmentInfo = await TreatmentModel.findOne({ _id: treatment })
    let consumptionLab
    if(treatmentInfo.type === "prothese") {
      const laboratoryInfo = await LaboratoryModel.findOne({ _id: laboratory })
      laboratoryInfo.consumptions.push({ doctor, patient, treatment, teeth, price })
      const newConsoLab = await laboratoryInfo.save()
      consumptionLab = newConsoLab._id
    }
    // END Add treatment in conso lab if prothese

    // start add this treatment in invoice
    // firstly check if there's an empty invoice
    // true ? append this treatment inside it 
    // else create new invoice and append this treatment inside it
    const latestInvoice = await InvoiceModel.findOne({ patient }).sort({ createdAt: -1 })
    let invoiceInfo = latestInvoice
    if(latestInvoice && latestInvoice.finish === 1) {
      let numInvoice = latestInvoice?.numInvoice || 0
      numInvoice++
      invoiceInfo = await InvoiceModel.create({ patient, numInvoice, LineInvoice: [] })
    }
    if(treatment) {
      invoiceInfo.LineInvoice.push({ doctor, devis, acte, price, teeth })
    } else {
      invoiceInfo.LineInvoice.push({ doctor, treatment, devis, price, teeth })
    }
    // save invoice data
    const savedInvoice = await invoiceInfo.save()
    const latestLine = savedInvoice.LineInvoice[savedInvoice.LineInvoice.length - 1]

    // get the `_id` latest line of this invoice
    const newLineInvoice = latestLine._id
    const ficheInfo = await FicheModel.findOne({ _id: ficheId, patient })
    
    const indexLine = ficheInfo.LineFiche.findIndex(lf => lf._id.equals(lineFicheId))

    ficheInfo.LineFiche[indexLine] = {  
      _id: ficheInfo.LineFiche[indexLine]._id, 
      createdAt: ficheInfo.LineFiche[indexLine].createdAt, 
      updatedAt: ficheInfo.LineFiche[indexLine].updatedAt, 
      dateAppointment: ficheInfo.LineFiche[indexLine]?.dateAppointment, 
      doctor, 
      acte, 
      amount, 
      payment: newPayment,
      lineInvoiceId: newLineInvoice,
      consumptionLab,
      finish: 1
    }

    await ficheInfo.save()
    await getFiches(request, response)
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}

 module.exports = { getFiches, createFiche, updateFiche, deleteFiche, createLineFiche }

