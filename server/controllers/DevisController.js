const DevisModel = require("../models/DevisModel");
const InvoiceModel = require("../models/InvoiceModel");

const getDevis = async (request, response) => {
  try {
    const { patient } = request.params
    const devis = await DevisModel
      .find({ patient })
      .populate("patient")
      .populate("user")
      .populate("LineDevis.treatment")
      .populate("LineDevis.doctor")
      .sort({ createdAt: -1 })
    response.status(200).json({ success: devis })
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}

const createDevis = async (request, response) => {
  try {
    const { patient } = request.params
    const { user, reduce, LineDevis } = request.body
    const latestDevis = await DevisModel.findOne({ patient: patient }).sort({ numDevis: -1 })
    let numDevis = latestDevis?.numDevis || 0
    numDevis++
    const formErrors = [] 
    if(Number(reduce) > 100 || Number(reduce) < 0) {
      formErrors.push("Donner une reduction valide") 
    }
    if(formErrors.length === 0) {
      await DevisModel.create({ user, patient, numDevis, reduce, LineDevis })
      await getDevis(request, response)
    } else {
      response.status(300).json({ formErrors })
    }
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
} 

const appendToDevis = async (request, response) => {
  try {
    const { id } = request.params
    const { doctor, treatment, price, teeth } = request.body
    const devisData = await DevisModel.findOne({ _id: id })

    const findIndex  = devisData.LineDevis.findIndex(ln => ln.treatment.equals(treatment._id))
    if(findIndex > -1) {
      devisData.LineDevis[findIndex].teeth.nums.push(teeth.nums)
      devisData.LineDevis[findIndex].teeth.surface += " " + teeth.surface
      // console.log("LineDevis: ", devisData.LineDevis[findIndex])

    } else {
      devisData.LineDevis.push({doctor: doctor._id, treatment: treatment._id, price, teeth})
    }
    await devisData.save()
    await getDevis(request, response)
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
} 

const editLineDevis = async (request, response) => {
  try {
    const { devisId, lineId } = request.params
    const { doctor, treatment, price, teeth } = request.body
    const devisData = await DevisModel.findOne({ _id: devisId })
    const findIndex = devisData.LineDevis.findIndex(line => line._id.equals(lineId))
    if(findIndex > -1) {
      Object.assign(devisData.LineDevis[findIndex], {
        doctor: doctor._id,
        treatment: treatment._id,
        price: price,
        teeth: teeth
      })
    }
    const formErrors = [] 
    
    if(formErrors.length === 0) {
      await devisData.save()
      await getDevis(request, response)
    } else {
      response.status(300).json({ formErrors })
    }

  } catch(err) {
    console.log("err: ", err)
    response.status(500).json({ err: err.message })
  }
} 

const updateDevis = async (request, response) => {
  try {
    const { id, patient } = request.params
    const { user, reduce } = request.body
    const formErrors = [] 
    if(Number(reduce) > 100 || Number(reduce) < 0) {
      formErrors.push("Donner une reduction valide") 
    }
    if(formErrors.length === 0) {
      await DevisModel.updateOne({ _id: id }, { user, patient, reduce }, { new: true })
      await getDevis(request, response)
    } else {
      response.status(300).json({ formErrors })
    }

  } catch(err) {
    response.status(500).json({ err: err.message })
  }
} 

const deleteLineDevis = async (request, response) => {
  try {
    const { devisId, lineDevisId } = request.params
    // Check if treatment is inside invoice
    const checkInvoice = await InvoiceModel.findOne({ "LineFacture.devis": lineDevisId })
    const formErrors = []
    if(checkInvoice) {
      formErrors.push("Le treatment a ete fait vous ne pouvez plus le supprimer.")
    }
    if(formErrors.length === 0) {
      const devisInfo = await DevisModel.findOne({ _id: devisId })
      devisInfo.LineDevis = devisInfo.LineDevis.filter(ln => !ln._id.equals(lineDevisId))
      await devisInfo.save()
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

module.exports = { getDevis, createDevis, appendToDevis, updateDevis, editLineDevis, deleteDevis, deleteLineDevis }

