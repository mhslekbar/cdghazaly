const FicheModel = require("../models/FicheModel")

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
    console.log("err: ", err)
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

module.exports = { getFiches, createFiche, updateFiche, deleteFiche }