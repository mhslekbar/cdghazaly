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
    const latestInvoice = await InvoiceModel.findOne({ patient }).sort({ createdAt: -1 })
    const formErrors = []
    if(latestInvoice && latestInvoice.finish === 0) {
      formErrors.push("la dernière facture n'est pas encore clôturé")
    }
    if(formErrors.length === 0) {
      let numInvoice = latestInvoice?.numInvoice || 0
      numInvoice++
      await InvoiceModel.create({ patient, numInvoice, LineInvoice: [] })
      await getInvoices(request, response)
    } else {
      response.status(300).json({ formErrors })
    }
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}

const deleteInvoice = async (request, response) => {
  try {
    const { id } = request.params
    const invoiceInfo = await InvoiceModel.findOne({ _id: id })
    const formErrors = []
    if(invoiceInfo.LineInvoice.length > 0) {
      formErrors.push("La facture ne peut pas être supprimée car elle est déjà remplie")
    }
    if(formErrors.length === 0) {
      await InvoiceModel.deleteOne({ _id: id })
      await getInvoices(request, response)
    } else {
      response.status(300).json({ formErrors })
    }
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}

module.exports = { getInvoices, createInvoice, deleteInvoice }
