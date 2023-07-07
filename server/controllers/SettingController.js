const SettingModel = require("../models/SettingModel");

const getSettings = async (request, response) => {
  try {
    const setting = await SettingModel.find()
    response.status(200).json({ success: setting })
  } catch (err) {
    response.status(500).json({ err: err.message })
  }
}

const createSetting = async (request, response) => {
  try {
    const { cons_price } = request.body
    const formErrors = []
    if(cons_price.length === 0) {
      formErrors.push("le prix de la consultation est obligatoire.")
    }
    if(formErrors.length === 0) {
      await SettingModel.create({ cons_price })
      await getSettings(request, response)
    } else {
      response.status(300).json({ formErrors })
    }
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}

const updateSetting = async (request, response) => {
  try {
    const { id } = request.params
    const settingData = await SettingModel.findOne({ _id: id})
    let { cons_price } = request.body
    const formErrors = []

    if(cons_price.length === 0) {
      cons_price = settingData.cons_price
    }

    if(formErrors.length === 0) {
      await SettingModel.updateOne({ _id: id }, { cons_price }, { new: true })
      await getSettings(request, response)
    } else {
      response.status(300).json({ formErrors })
    }
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}

const deleteSetting = async (request, response) => {
  try {
    const { id } = request.params
    await SettingModel.deleteOne({_id: id})
    await getSettings(request, response)
  } catch(err) {
    response.status(500).json({ err })
  }
}

module.exports = { getSettings, createSetting, updateSetting, deleteSetting }
