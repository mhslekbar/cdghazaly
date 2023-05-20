const LaboratoryModel = require("../../models/LaboratoryModel");

const getPaymentsLab = async (request, response) => {
  try {
    const { labId } = request.params
    const laboratory = await LaboratoryModel.findOne({ _id: labId })
    response.status(200).json({ success: laboratory.payments })
  } catch(error) {
    response.status(500).json({ error: error.message })
  }
}

const createPaymentLab = async (request, response) => {
  try {
    const { labId } = request.params
    const { doctor, comment, amount } = request.body
    const laboratory = await LaboratoryModel.findOne({ _id: labId })

    const formErrors = []

    if(labId.length === 0) {
      formErrors.push("Error!!!")
    }

    if(doctor.length === 0) {
      formErrors.push("Le docteur est obligatoire")
    }
    if(amount.length === 0) {
      formErrors.push("Le montant est obligatoire")
    }

    if(formErrors.length === 0) {
      laboratory.payments.push({ doctor, comment, amount })
      await laboratory.save()
      await getPaymentsLab(request, response)
    } else {
      response.status(300).json({ formErrors })
    }
  } catch(error) {
    response.status(500).json({ error: error.message })
  }
}

const updatePaymentLab = async (request, response) => {
  try {
    const { labId, paymentId } = request.params
    const { doctor, comment, amount } = request.body
    const laboratory = await LaboratoryModel.findOne({ _id: labId })

    const formErrors = []

    if(labId.length === 0) {
      formErrors.push("Error!!!")
    }
    
    if(doctor.length === 0) {
      formErrors.push("Le docteur est obligatoire")
    }
    if(amount.length === 0) {
      formErrors.push("Le montant est obligatoire")
    }

    if(formErrors.length === 0) {
      const findIndex = laboratory.payments.findIndex(p => p._id.equals(paymentId))
      if(findIndex > -1) {
        const data = laboratory.payments[findIndex]
        laboratory.payments[findIndex] = {
          _id: data._id,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          doctor,
          comment,
          amount
        }
      await laboratory.save()

      } else {
        response.status(300).json("not find")
      }
      await getPaymentsLab(request, response)
    } else {
      response.status(300).json({ formErrors })
    }
  } catch(error) {
    response.status(500).json({ error: error.message })
  }
}

const deletePaymentLab = async (request, response) => {
  try {
    const { labId, paymentId } = request.params
    const laboratory = await LaboratoryModel.findOne({ _id: labId })
    laboratory.payments = laboratory.payments.filter(p => !p.equals(paymentId))
    await laboratory.save()
    await getPaymentsLab(request, response)
  } catch(error) {
    response.status(500).json({ error: error.message })
  }
}

module.exports = { getPaymentsLab, createPaymentLab, updatePaymentLab, deletePaymentLab }
