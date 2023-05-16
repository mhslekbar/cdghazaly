const DevisModel = require("../models/DevisModel");
const InvoiceModel = require("../models/InvoiceModel");

const getDevis = async (request, response) => {
  try {
    const { patient } = request.params
    const devis = await DevisModel.find({ patient }).sort({ createdAt: -1 })
    response.status(200).json({ success: devis })
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}

const createDevis = async (request, response) => {
  try {
    const { patient } = request.params
    const { user, reduce, LineDevis } = request.body
    const latestDevis = await DevisModel.findOne({ patient }).sort({ createAt: -1 })
    let numDevis = latestDevis?.numDevis || 0
    numDevis++
    await DevisModel.create({ user, patient, numDevis, reduce, LineDevis })
    await getDevis(request, response)
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
} 

const appendToDevis = async (request, response) => {
  try {
    const { id } = request.params
    const devisData = await DevisModel.findOne({ _id: id })
    devisData.LineDevis.push(request.body)
    devisData.save()
    await getDevis(request, response)
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
} 

const updateDevis = async (request, response) => {
  try {
    const { id, patient } = request.params
    const { user, reduce } = request.body
    await DevisModel.updateOne({ _id: id }, { user, patient, reduce }, { new: true })
    await getDevis(request, response)
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
} 

const deleteLineDevis = async (request, response) => {
  try {
    const { id, lineDevisId } = request.params
    // Check if treatment is inside invoice
    const checkInvoice = await InvoiceModel.findOne({ "LineFacture.devis": lineDevisId })
    const formErrors = []
    if(checkInvoice) {
      formErrors.push("Le treatment a ete fait vous ne pouvez plus le supprimer.")
    }
    if(formErrors.length === 0) {
      const devisInfo = await DevisModel.findOne({ _id: id })
      devisInfo.LineDevis = devisInfo.LineDevis.filter(ln => ln._id !== lineDevisId)
      devisInfo.save()
      await getDevis(request, response)
    } else {
      response.status(300).json({ formErrors })
    }
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}

const deleteDevis = async (request, response) => {
  try {
    const { id } = request.params
    await DevisModel.deleteOne({ _id: id })
    await getDevis(request, response)
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
} 

module.exports = { getDevis, createDevis, appendToDevis, updateDevis, deleteDevis, deleteLineDevis }

