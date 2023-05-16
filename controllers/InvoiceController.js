const InvoiceModel = require("../models/InvoiceModel");

const getInvoices = async (request, response) => {
  try {
    const { patient } = request.params
    const invoices = await InvoiceModel.find({ patient }).sort({ createdAt: -1 })
    response.status(200).json({ success: invoices })
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}

const createInvoice = async (request, response) => {
  try {
    const { patient } = request.params
    const latestInvoice = await InvoiceModel.findOne({ patient })
    let { numInvoice } = latestInvoice
    numInvoice++
    await InvoiceModel.create({ patient, numInvoice, LineInvoice: [] })
    await getInvoices(request, response)
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}

const deleteInvoice = async (request, response) => {
  try {
    const { id } = request.params
    await InvoiceModel.deleteOne({ _id: id })
    await getInvoices(request, response)
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}

module.exports = { getInvoices, createInvoice, deleteInvoice }
