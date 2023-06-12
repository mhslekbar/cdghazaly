const AssuranceModel = require("../../models/AssuranceModel");

const getAssurances = async (req, res) => {
  try {
    const assurances = await AssuranceModel
    .find()
    .populate("invoices.doctor")
    .sort({ createdAt: -1 })
    res.status(200).json({ success: assurances })
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

const createAssurance = async (req, res) => {
  try {
    const { name, cons_price, color, doctorInCommon, inCommon } = req.body
    const formErrors = []
    const checkAssurance = await AssuranceModel.findOne({ name })
    if(checkAssurance) {
      formErrors.push("La societe existe deja!");
    }
    if(name.length === 0) {
      formErrors.push("le nom de la societe est obligatoire!");
    }
    if(cons_price.length === 0) {
      formErrors.push("Prix de la consultation est obligatoire!");
    }
    if(color.length === 0) {
      formErrors.push("la couleur de la societe est obligatoire pour differencier entre eux!");
    }
    if(formErrors.length === 0) {
      await AssuranceModel.create({ name, cons_price, color, doctorInCommon, invoices:[]})
      await getAssurances(req, res)
    } else {
      res.status(300).json({ formErrors })
    }
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

const updateAssurance = async (req, res) => {
  try {
    const { id } = req.params
    const assuranceData = await AssuranceModel.findOne({ _id: id })
    const { name, cons_price, color, doctorInCommon, inCommon } = req.body

    const formErrors = []
    const checkAssurance = await AssuranceModel.findOne({ _id: {$ne: id}, name })
    if(checkAssurance) {
      formErrors.push("La societe existe deja!");
    }
    if(name.length === 0) {
      name = assuranceData.name
    }
    if(cons_price.length === 0) {
      cons_price = assuranceData.cons_price
    }
    if(formErrors.length === 0) {
      await AssuranceModel.updateOne({_id: id}, { name, cons_price, color })
      await getAssurances(req, res)
    } else {
      res.status(300).json({ formErrors })
    }
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

const deleteAssurance = async (req, res) => {
  try {
    const { id } = req.params
    const formErrors = []
    // start check if there's a patient assured or if there's a treatment assured ? 
    // end check if there's a patient assured or if there's a treatment assured ? 

    if(formErrors.length === 0) {
      await AssuranceModel.findByIdAndDelete(id)
      await getAssurances(req, res)
    } else {
      res.status(300).json({ formErrors })
    }

  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

module.exports = { getAssurances, createAssurance, updateAssurance, deleteAssurance }
