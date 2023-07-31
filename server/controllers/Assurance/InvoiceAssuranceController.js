const AssuranceModel = require("../../models/AssuranceModel")
const PaymentModel = require("../../models/PaymentModel")
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
    response.status(500).json({ err: err.message })
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
    await PaymentModel.updateMany({ invoiceAssur: invoiceId }, { $set: { createdAt: new Date() }});
    await getAssurances(request, response)
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}

const deleteInvoiceAssurance = async (request, response) => {
  try {
    const { AssId, invoiceId } = request.params
    const assurance = await AssuranceModel.findOne({ _id: AssId })
    const findIndex = assurance.invoices.findIndex(ass => ass._id.equals(invoiceId))
    const formErrors = []
    if(findIndex > -1) {
      if(assurance.invoices[findIndex].payed) {
        formErrors.push("Impossible de supprimer la facture !!");
      }
    }

    if(formErrors.length === 0) {
      assurance.invoices = assurance.invoices.filter(ass => !ass._id.equals(invoiceId))
      await assurance.save();
      await getAssurances(request, response)
    } else {
      response.status(300).json({ formErrors })
    }

  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}

module.exports = { createInvoiceAssurance, payInvoiceAssurance, deleteInvoiceAssurance }
