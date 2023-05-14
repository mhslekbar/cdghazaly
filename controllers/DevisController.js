const DevisModel = require("../models/DevisModel");

const getDevis = async (request, response) => {
  try {
    const { patient } = request.body
    const devis = await DevisModel.find({ patient }).sort({ createdAt: -1 })
    response.status(200).json({ devis })
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}

const createDevis = async (request, response) => {
  try {
    const { doctor, patient, reduce, LineDevis } = request.body
    const latestDevis = await DevisModel.findOne({ patient })
    const prevNumDevis = latestDevis.numDevis || 0
    const newNumDevis = prevNumDevis++;
    await DevisModel.create({ doctor, patient, numDevis: newNumDevis, reduce, LineDevis })
    await getDevis(request, response)
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
} 

const updateDevis = async (request, response) => {
  try {
    const { id } = request.params
    const { doctor, patient, reduce, LineDevis } = request.body
    await DevisModel.updateOne({ _id: id }, { doctor, patient, reduce, LineDevis }, { new: true })
    await getDevis(request, response)
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

module.exports = { getDevis, createDevis, updateDevis, deleteDevis }

