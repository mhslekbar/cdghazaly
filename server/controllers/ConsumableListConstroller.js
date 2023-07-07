const ConsumableListModel = require("../models/ConsumableListModel");


const getConsumableList = async (request, response) => {
  try {
    const consumableList = await ConsumableListModel.find().sort({ createdAt: -1 })
    response.status(200).json({ success: consumableList })
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}

const createConsumableList = async (request, response) => {
  try {
    const { name } = request.body
    const checkConsumableList = await ConsumableListModel.findOne({ name })
    const formErrors = []
    if(checkConsumableList) {
      formErrors.push("Le consomable deja existe.")
    }
    if(name.length === 0) {
      formErrors.push("Le nom du consomable est obligatoire !!")
    }
    if(formErrors.length === 0) {
      await ConsumableListModel.create(request.body)
      await getConsumableList(request, response)
    } else {
      response.status(300).json({ formErrors })
    }
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}

const updateConsumableList = async (request, response) => {
  try {
    const { id } = request.params
    const consumableListData = await ConsumableListModel.findOne({_id: id})
    const { name } = request.body
    const checkConsumableList = await ConsumableListModel.findOne({ _id: {$ne: id}, name })
    const formErrors = []
    if(checkConsumableList) {
      formErrors.push("Le consomable deja existe.")
    }
    if(name.length === 0) {
      name = consumableListData.name
    }
    if(formErrors.length === 0) {
      await ConsumableListModel.updateOne({_id: id}, request.body, {new: true})
      await getConsumableList(request, response)
    } else {
      response.status(300).json({ formErrors })
    }
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}

const deleteConsumableList = async (request, response) => {
  try {
    const { id } = request.params

    const formErrors = []
    // start check if there's a treatment selled from this lab 
    // end check if there's a treatment selled from this lab 
    if(formErrors.length === 0) {
      await ConsumableListModel.deleteOne({_id: id})
      await getConsumableList(request, response)
    } else {
      response.status(300).json({ formErrors })
    }
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}


module.exports = { getConsumableList, createConsumableList, updateConsumableList, deleteConsumableList }

