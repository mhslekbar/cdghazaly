const PaymentMethodModel = require("../models/PaymentMethodModel");

const getPaymentMethods = async (request, response) => {
  try {
    const paymentMethod = await PaymentMethodModel.find()
    response.status(200).json({ success: paymentMethod })
  } catch (err) {
    response.status(500).json({ err: err.message })
  }
}

const createPaymentMethod = async (request, response) => {
  try {
    const { name, code } = request.body
    const formErrors = []
    const checkPaymentMethod = await PaymentMethodModel.findOne({name})
    if(checkPaymentMethod) {
      formErrors.push("la methode deja existe.")
    }
    if(name.length === 0) {
      formErrors.push("le nom est obligatoire.")
    }
    if(code.length === 0) {
      formErrors.push("le code est obligatoire.")
    }
    if(formErrors.length === 0) {
      await PaymentMethodModel.create({ name, code })
      await getPaymentMethods(request, response)
    } else {
      response.status(300).json({ formErrors })
    }
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}

const updatePaymentMethod = async (request, response) => {
  try {
    const { id } = request.params
    const { name, code } = request.body
    const checkPaymentMethod = await PaymentMethodModel.findOne({ _id: {$ne: id},  name})
    const formErrors = []
    const paymentMethodInfo = await PaymentMethodModel.findOne({ _id: id})
    if(checkPaymentMethod) {
      formErrors.push("la methode deja existe.")
    }
    if(name.length === 0) {
      name = paymentMethodInfo.name
    }
    if(code.length === 0) {
      code = paymentMethodInfo.code
    }
    if(formErrors.length === 0) {
      await PaymentMethodModel.updateOne({_id: id}, { name, code })
      await getPaymentMethods(request, response)
    } else {
      response.status(300).json({ formErrors })
    }
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}

const deletePaymentMethod = async (request, response) => {
  try {
    const { id } = request.params
    await PaymentMethodModel.deleteOne({_id: id})
    await getPaymentMethods(request, response)
  } catch(err) {
    response.status(500).json({ err })
  }
}

module.exports = { getPaymentMethods, createPaymentMethod, updatePaymentMethod, deletePaymentMethod }
