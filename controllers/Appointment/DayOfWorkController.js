const DayOfWorkModel = require("../../models/DayOfWorkModel")

const getDays = async (request, response) => {
  try {
    const { doctor } = request.params
    const days = await DayOfWorkModel.findOne({ doctor }).sort({ "dayOfWork.order": 1 })
    response.status(200).json({ success: days })
  } catch(error) {
    response.status(500).json({ error: error.message })
  }
}

const createDay = async (request, response) => {
  try {
    const { doctor } = request.params
    const { dayOfWork } = request.body

    const formErrors = []

    if(dayOfWork.length === 0) {
      formErrors.push("Vous etes obligé de choisir un jour.")
    }

    if(formErrors.length === 0) {
      const days = await DayOfWorkModel.findOne({ doctor }).sort({ "dayOfWork.order": 1 })
      days.dayOfWork = dayOfWork
      await days.save()

      await getDays(request, response)
    } else {
      response.status(300).json({ formErrors })
    }
  } catch(error) {
    response.status(500).json({ error: error.message })
  }
}


// const createDay = async (request, response) => {
//   try {
//     const { doctor } = request.params
//     const { name, order } = request.body
//     const checkDay = await DayOfWorkModel.findOne({ doctor, name })
//     const checkOrder = await DayOfWorkModel.findOne({ order })
//     const formErrors = []
//     if(checkDay) {
//       formErrors.push(`${name} deja existe`)
//     }
//     if(name.length === 0) {
//       formErrors.push("le nom est obligatoire")
//     }
//     if(checkOrder) {
//       formErrors.push(`order: ${Number(order) + 1} deja existe`)
//     }
//     if(formErrors.length === 0) {
//       await DayOfWorkModel.create({ doctor, name, order })
//       await getDays(request, response)
//     } else {
//       response.status(300).json({ formErrors })
//     }
//   } catch(error) {
//     response.status(500).json({ error: error.message })
//   }
// }

const editDay = async (request, response) => {
  try {
    const { doctor, id } = request.params
    const { name, order } = request.body
    const checkDay = await DayOfWorkModel.findOne({ _id: {$ne: id}, doctor, name })
    const checkOrder = await DayOfWorkModel.findOne({ _id: {$ne: id}, order })
    const formErrors = []
    if(checkDay) {
      formErrors.push(`${name} deja existe`)
    }
    if(name.length === 0) {
      formErrors.push("le nom est obligatoire")
    }
    if(checkOrder) {
      formErrors.push(`order: ${Number(order) + 1} deja existe`)
    }
    if(formErrors.length === 0) {
      await DayOfWorkModel.updateOne({_id: id}, { doctor, name, order }, { new: true })
      await getDays(request, response)
    } else {
      response.status(300).json({ formErrors })
    }
  } catch(error) {
    response.status(500).json({ error: error.message })
  }
}

const deleteDay = async (request, response) => {
  try {
    const { doctor, id } = request.params
    // if need to check if this day has an appointment
    const formErrors = []

    if(formErrors.length === 0) {
      await DayOfWorkModel.deleteOne({_id: id})
      await getDays(request, response)
    }
  } catch(error) {
    response.status(500).json({ error: error.message })
  }
}

module.exports = { getDays, createDay, editDay, deleteDay }
