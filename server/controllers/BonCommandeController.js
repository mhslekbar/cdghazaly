const BonCommandeModel = require("../models/BonCommandeModel")

const getBonCommandes = async (request, response) => {
  try {
    const { doctor } = request.params
    const BC = await BonCommandeModel.find({ doctor }).sort({ createdAt: -1 })
    response.status(200).json({ success: BC })
  } catch(error) {
    response.status(500).json({ error: error.message })
  }
}

const createBonCommande = async (request, response) => {
  try {
    const { doctor } = request.params
    const { LineBC} = request.body
    const latestBC = await BonCommandeModel.findOne({ doctor }).sort({ createdAt: -1 })
    let numBC = latestBC?.numBC || 0
    numBC++
    await BonCommandeModel.create({ doctor, numBC, LineBC })
    await getBonCommandes(request, response)
  } catch (error) {
    response.status(500).json({ error: error.message })
  }
}

const updateBonCommande = async (request, response) => {
  try {
    const { id } = request.params
    const { reference, total, LineBC } = request.body
    const formErrors = []

    if(LineBC.length === 0) {
      formErrors.push("Le donnes du bon de commande sont obligatoire.")
    }

    if(formErrors.length === 0) {
      await BonCommandeModel.updateOne({ _id: id }, { reference, total, LineBC }, { new: true })
      await getBonCommandes(request, response)
    } else {
      response.status(300).json({ formErrors })
    }
  } catch (error) {
    response.status(500).json({ error: error.message })
  }
}

const deleteBonCommande = async (request, response) => {
  try {
    const { id } = request.params
    await BonCommandeModel.deleteOne({ _id: id})
    await getBonCommandes(request, response)
  } catch(error) {
    response.status(500).json({ error: error.message })
  }
}
module.exports = { getBonCommandes, createBonCommande, updateBonCommande, deleteBonCommande }