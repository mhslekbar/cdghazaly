const TreatmentModel = require("../models/TreatmentModel")

const getTreatments = async (req, res) => {
  try {
    const { treat, assurance } = req.query
    let treatments

    if(treat) {
      if(assurance) {
        treatments = await TreatmentModel.find({
          name: { $regex: new RegExp("^" + treat, "i") },
          assurance
        }).populate("assurance").sort({ name: 1 })
      } else {
        treatments = await TreatmentModel.find({
          name: { $regex: new RegExp("^" + treat, "i") }
        }).populate("assurance").sort({ name: 1 })
      }
    } else {
      treatments = await TreatmentModel.find().populate("assurance").sort({ name: 1 })
    }
    res.status(200).json({ success: treatments })
  } catch(err) {
    res.status(500).json({ err: err.message })
  }
}

const createTreatment = async (req, res) => {
  try {
    const { name, type, price, assurance } = req.body

    const formErrors = []
    const checkTreatment = await TreatmentModel.find({ name })

    if(checkTreatment.length > 0) {
      if(assurance) {
        if(checkTreatment.find(check => check.assurance?.equals(assurance))) {
          formErrors.push("Traitement deja assuré")          
        }
      } else {
        formErrors.push("Traitement deja existe")
      }
    }
    
    if(name.length === 0) {
      formErrors.push("Le nom du traitement est obligatoire")
    }
    if(type.length === 0) {
      formErrors.push("Le type du traitement est obligatoire")
    }
    if(price.length === 0) {
      formErrors.push("Le prix du traitement est obligatoire")
    }
    if(formErrors.length === 0) {
      await TreatmentModel.create(req.body)
      await getTreatments(req, res)
    } else {
      res.status(300).json({ formErrors })
    }
  } catch(err) {
    res.status(500).json({ err: err.message })
  }
}

const updateTreatment = async (req, res) => {
  try {
    const { id } = req.params
    const treatData = await TreatmentModel.findOne({ _id: id })
    const { name, type, price, assurance } = req.body
    const formErrors = []
    
    const checkTreatment = await TreatmentModel.find({ _id: {$ne: id},  name })
    // const checkTreatment = await TreatmentModel.find({ name })

    if(checkTreatment.length > 0) {
      if(assurance) {
        if(checkTreatment.find(check => check.assurance?.equals(assurance))) {
          formErrors.push("Traitement deja assuré")          
        }
      } else {
        formErrors.push("Traitement deja existe")
      }
    }

    if(name.length === 0) {
      name = treatData.name
    }
    if(type.length === 0) {
      type = treatData.type
    }
    if(price.length === 0) {
      price = treatData.price
    }
    if(formErrors.length === 0) {
      await TreatmentModel.updateOne({_id: id}, { name, type, price }, { new: true })
      await getTreatments(req, res)
    } else {
      res.status(300).json({ formErrors })
    }
  } catch(err) {
    res.status(500).json({ err: err.message })
  }
}

const deleteTreatment = async (req, res) => {
  try {
    const { id } = req.params
    const formErrors = []
    // start check treatment in devis or invoice
    // end check treatment in devis or invoice
    if(formErrors.length === 0) {
      await TreatmentModel.findByIdAndDelete(id)
      await getTreatments(req, res)
    } else {
      res.status(300).json({ formErrors })
    }
  } catch(err) {
    res.status(500).json({ err: err.message })
  }
}

module.exports = { getTreatments, createTreatment, updateTreatment, deleteTreatment }