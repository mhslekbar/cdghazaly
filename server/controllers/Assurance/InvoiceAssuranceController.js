const AssuranceModel = require("../../models/AssuranceModel")
const UserModel = require("../../models/UserModel")
const { getAssurances } = require("../Assurance/AssuranceController")

const createInvoiceAssurance = async (request, response) => {
  try {
    const { AssId } = request.params

    const findAssurance = await AssuranceModel.findOne({ _id: AssId })
    const Users = await UserModel.find()
    let lastInvoice = findAssurance.invoices[findAssurance.invoices.length - 1]
    if(lastInvoice) {
      lastInvoice.finish = true
    }
    let numInvoice = lastInvoice?.numInvoice || 0
    numInvoice++
    if(numInvoice) {
      Users
        .filter(user => user.doctor.cabinet)
        .map(user => {
          findAssurance.invoices.push({ numInvoice, doctor: [user._id] })
        })
      await findAssurance.save();
    }
    await getAssurances(request, response)      
  } catch(err) {
    console.log("err: ", err)
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
