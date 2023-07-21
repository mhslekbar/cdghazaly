const AssuranceModel = require("../../models/AssuranceModel")
const { getAssurances } = require("../Assurance/AssuranceController")

const createInvoiceAssurance = async (request, response) => {
  try {
    const { AssId } = request.params

    const findAssurance = await AssuranceModel.findOne({ _id: AssId })
    let lastInvoice = findAssurance.invoices[findAssurance.invoices.length - 1]
    if(lastInvoice) {
      lastInvoice.finish = true
    }
    let numInvoice = lastInvoice?.numInvoice || 0
    numInvoice++
    if(numInvoice) {
      findAssurance.invoices.push({ numInvoice })
      await findAssurance.save();
    }
    await getAssurances(request, response)      
  } catch(err) {
    response.status(500).json({ err: err.json })
  }
}

const payInvoiceAssurance = async (request, response) => {
  try {
    const { AssId, invoiceId } = request.params
    const assurance = await AssuranceModel.findOne({ _id: AssId })
    const findIndex = assurance.invoices.findIndex(ass => ass._id.equals(invoiceId))
    if(findIndex > -1) {
      assurance.invoices[findIndex].payed = true
    }
    await assurance.save();
    await getAssurances(request, response)
  } catch(err) {
    response.status(500).json({ err: err.json })
  }
}

const deleteInvoiceAssurance = async (request, response) => {
  try {
    const { AssId, invoiceId } = request.params
    const assurance = await AssuranceModel.findOne({ _id: AssId })
    assurance.invoices = assurance.invoices.filter(ass => !ass._id.equals(invoiceId))
    await assurance.save();
    await getAssurances(request, response)
  } catch(err) {
    response.status(500).json({ err: err.json })
  }
}

module.exports = { createInvoiceAssurance, payInvoiceAssurance, deleteInvoiceAssurance }
