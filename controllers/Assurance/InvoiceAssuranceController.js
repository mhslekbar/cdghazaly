const AssuranceModel = require("../../models/AssuranceModel")
const UserModel = require("../../models/UserModel")
const { getAssurances } = require("../Assurance/AssuranceController")

const createInvoiceAssurance = async (request, response) => {
  try {
    const { AssId } = request.params
    const { doctor, inCommon } = request.body

    const findAssurance = await AssuranceModel.findOne({ _id: AssId })
    const Users = await UserModel.find()
    let lastInvoice = findAssurance.invoices[findAssurance.invoices.length - 1]
    let numInvoice = lastInvoice?.numInvoice || 0
    numInvoice++
    if(inCommon) {
      findAssurance.invoices.push({ numInvoice, doctor, inCommon })
    } else {
      Users
        .filter(user => user.doctor.cabinet)
        .map(user => {
          findAssurance.invoices.push({ numInvoice, doctor: [user._id], inCommon })
        })
    }
    await findAssurance.save();
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

module.exports = { createInvoiceAssurance, deleteInvoiceAssurance }
