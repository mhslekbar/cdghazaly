const PurchaseOrderModel = require("../models/PurchaseOrderModel")

const getPurchaseOrders = async (request, response) => {
  try {
    const { doctor } = request.params
    const PurchaseOrder = await PurchaseOrderModel
    .find({ doctor })
    .populate("doctor")
    .sort({ createdAt: -1 })
    response.status(200).json({ success: PurchaseOrder })
  } catch(error) {
    response.status(500).json({ error: error.message })
  }
}

const createPurchaseOrder = async (request, response) => {
  try {
    const { doctor } = request.params
    const { LinePurchaseOrder } = request.body
    const currentDate =  new Date()
    const latestPurchaseOrder = await PurchaseOrderModel
    .findOne({ doctor, $expr: {
      $eq: [{ $month: "$createdAt" }, currentDate.getMonth()],
      $eq: [{ $year: "$createdAt" }, currentDate.getFullYear()],
    }, })
    .sort({ createdAt: -1 })

    let num = latestPurchaseOrder?.num || 0
    num++
    await PurchaseOrderModel.create({ doctor, num, LinePurchaseOrder })
    await getPurchaseOrders(request, response)
  } catch (error) {
    response.status(500).json({ error: error.message })
  }
}

const updatePurchaseOrder = async (request, response) => {
  try {
    const { id } = request.params
    const { reference, total, LinePurchaseOrder } = request.body
    const formErrors = []

    if(LinePurchaseOrder.length === 0) {
      formErrors.push("Le donnes du bon de commande sont obligatoire.")
    }

    if(formErrors.length === 0) {
      await PurchaseOrderModel.updateOne({ _id: id }, { reference, total, LinePurchaseOrder }, { new: true })
      await getPurchaseOrders(request, response)
    } else {
      response.status(300).json({ formErrors })
    }
  } catch (error) {
    response.status(500).json({ error: error.message })
  }
}

const deletePurchaseOrder = async (request, response) => {
  try {
    const { id } = request.params
    await PurchaseOrderModel.deleteOne({ _id: id})
    await getPurchaseOrders(request, response)
  } catch(error) {
    response.status(500).json({ error: error.message })
  }
}

module.exports = { getPurchaseOrders, createPurchaseOrder, updatePurchaseOrder, deletePurchaseOrder }

