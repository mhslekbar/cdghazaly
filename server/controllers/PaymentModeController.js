const PaymentModeModel = require("../models/PaymentModeModel");

const getPaymentModes = async (request, response) => {
  try {
    const paymentMode = await PaymentModeModel.find()
    response.status(200).json({ success: paymentMode })
  } catch (err) {
    response.status(500).json({ err: err.message })
  }
}

const createPaymentMode = async (request, response) => {
  try {
    const { name, code } = request.body
    const formErrors = []
    const checkPaymentMode = await PaymentModeModel.findOne({name})
    if(checkPaymentMode) {
      formErrors.push("la methode deja existe.")
    }
    if(name.length === 0) {
      formErrors.push("le nom est obligatoire.")
    }
    if(code.length === 0) {
      formErrors.push("le code est obligatoire.")
    }
    if(formErrors.length === 0) {
      await PaymentModeModel.create({ name, code })
      await getPaymentModes(request, response)
    } else {
      response.status(300).json({ formErrors })
    }
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}

const updatePaymentMode = async (request, response) => {
  try {
    const { id } = request.params
    const { name, code } = request.body
    const checkPaymentMode = await PaymentModeModel.findOne({ _id: {$ne: id},  name})
    const formErrors = []
    const paymentModeInfo = await PaymentModeModel.findOne({ _id: id})
    if(checkPaymentMode) {
      formErrors.push("la methode deja existe.")
    }
    if(name.length === 0) {
      name = paymentModeInfo.name
    }
    if(code.length === 0) {
      code = paymentModeInfo.code
    }
    if(formErrors.length === 0) {
      await PaymentModeModel.updateOne({_id: id}, { name, code })
      await getPaymentModes(request, response)
    } else {
      response.status(300).json({ formErrors })
    }
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}

const deletePaymentMode = async (request, response) => {
  try {
    const { id } = request.params
    await PaymentModeModel.deleteOne({_id: id})
    await getPaymentModes(request, response)
  } catch(err) {
    response.status(500).json({ err })
  }
}

module.exports = { getPaymentModes, createPaymentMode, updatePaymentMode, deletePaymentMode }
