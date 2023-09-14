const LaboratoryModel = require("../../models/LaboratoryModel");

const getPaymentsLab = async (request, response) => {
  try {
    const { labId } = request.params
    let labo = await LaboratoryModel
    .findOne({ _id: labId }, {_id: 1, name: 1, phone: 1, createdAt: 1, payments: 1})
    .populate("payments.doctor")
    response.status(200).json({ success: labo.payments })
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}

const createPaymentLab = async (request, response) => {
  try {
    const { labId } = request.params
    const { doctor, comment, amount, createdAt } = request.body
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
      laboratory.payments.push({ doctor, comment, amount, createdAt })
      const findAccount = laboratory.accounts.findIndex(acc => acc.doctor.equals(doctor))
      if(findAccount > -1) {
        const prevBalance = laboratory.accounts[findAccount].balance
        const newBalance  = Number(prevBalance) + Number(amount)
        laboratory.accounts[findAccount].balance = newBalance
      }
      await laboratory.save()
      await getPaymentsLab(request, response)
    } else {
      response.status(300).json({ formErrors })
    }
  } catch(error) {
    console.log("error: ", error)
    response.status(500).json({ error: error.message })
  }
}

const updatePaymentLab = async (request, response) => {
  try {
    const { labId, paymentId } = request.params
    const { doctor, comment, amount, createdAt } = request.body
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
        const prevAmount =  laboratory.payments[findIndex].amount
        const findAccount = laboratory.accounts.findIndex(acc => acc.doctor.equals(doctor))
        if(findAccount > -1) {
          const prevBalance = laboratory.accounts[findAccount].balance
          const newBalance  = Number(prevBalance) - Number(prevAmount) + Number(amount)
          laboratory.accounts[findAccount].balance = newBalance
        }

        const data = laboratory.payments[findIndex]
        laboratory.payments[findIndex] = {
          _id: data._id,
          updatedAt: data.updatedAt,
          createdAt: createdAt,
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

    const findIndex = laboratory.payments.findIndex(p => p._id.equals(paymentId))

    if(findIndex > -1) {
      const prevAmount =  laboratory.payments[findIndex].amount
      const doctor =  laboratory.payments[findIndex].doctor
      const findAccount = laboratory.accounts.findIndex(acc => acc.doctor.equals(doctor))
      if(findAccount > -1) {
        const prevBalance = laboratory.accounts[findAccount].balance
        const newBalance  = Number(prevBalance) - Number(prevAmount)
        laboratory.accounts[findAccount].balance = newBalance
      }
      laboratory.payments = laboratory.payments.filter(p => !p.equals(paymentId))
    }

    await laboratory.save()
    await getPaymentsLab(request, response)
  } catch(error) {
    response.status(500).json({ error: error.message })
  }
}

module.exports = { getPaymentsLab, createPaymentLab, updatePaymentLab, deletePaymentLab }
