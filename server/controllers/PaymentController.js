const PaymentModel = require("../models/PaymentModel")
const PatientModel = require("../models/PatientModel")
const FicheModel = require("../models/FicheModel")
const InvoiceModel = require("../models/InvoiceModel")
const AssuranceModel = require("../models/AssuranceModel")

const getPayments = async (request, response) => {
  try {
    const { patient } = request.query
    let payments
    if(patient) {
      payments = await PaymentModel.find({ patient })
        .populate("user")
        .populate("doctor")
        .populate("patient")
        .populate("method")
      .sort({ createdAt: -1 })
    } else {
      payments = await PaymentModel.find()
        .populate("user")
        .populate("doctor")
        .populate("patient")
        .populate("method")
      .sort({ createdAt: -1 })
    }
    
    payments = await Promise.all(payments.map(async payment => {
      let invoiceLine
      if(payment.invoiceAssur) {
        let assuranceInfo = await AssuranceModel.findOne({ "invoices._id": payment.invoiceAssur })
        invoiceLine = assuranceInfo?.invoices?.find(invoice => invoice._id.equals(payment.invoiceAssur))
      }
      return {
        _id: payment._id,
        user: payment.user, 
        doctor: payment.doctor, 
        patient: payment.patient, 
        method: payment.method, 
        amount: payment.amount, 
        type: payment.type, 
        createdAt: payment.createdAt, 
        updateAt: payment.updatedAt, 
        invoiceAssur: invoiceLine,
        supported: payment.supported
      }
    }))
      
    response.status(200).json({ success: payments })
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}

const createPayment = async (request, response) => {
  try {
    // versement
    let { user, doctor, patient, amount, type, method, supported, createdAt } = request.body
    let patientInfo   = await PatientModel.findOne({ _id: patient })
    
    const formErrors = []
    if(amount.length === 0) {
      formErrors.push("donner le montant")
    }

    let invoiceAssur = null

    // Start keep invoice assurance
    const { assurance } = patientInfo
    const AssInfo = await AssuranceModel.findOne({ _id: assurance.society })
    const invoiceAssurance = AssInfo?.invoices.find(invoice => !invoice.finish)    

    if(AssInfo && supported?.length === 0) {
      // formErrors.push("Donner la prise en charge")
    } 
    // END keep invoice assurance
    
    if(supported?.length === 0) {
      supported = null
    } else {
      supported += "/" + new Date().getFullYear()
      if(!invoiceAssurance) {
        formErrors.push("Le patient est assuré par une societe que vous n'avez pas encore creer sa facture")
        formErrors.push("Veuillez creer une facture pour cette societe d'assurance")
      } else {
        invoiceAssur = invoiceAssurance._id
      }
    }

    if(formErrors.length === 0) {
      let latestPatient = await PatientModel
        .findOne({ RegNo: { $not: { $type: 10 } } })
        .sort({ RegNo: -1 })

      let prevMatricule = latestPatient?.RegNo ?? 0
      
      if(!patientInfo.RegNo) { // start Check RegNo
        // Start Create RegNo
        let newMatricule  = prevMatricule + 1
        patientInfo.RegNo = newMatricule
        await patientInfo.save()
        // END Create RegNo

        // START Create Invoice
        const latestInvoice = await InvoiceModel.findOne({ patient }).sort({ createdAt: -1 })
        let numInvoice = latestInvoice?.numInvoice ?? 0
        if(latestInvoice?.numInvoice) {
          latestInvoice.finish = true
          await latestInvoice.save()
        }
        numInvoice++
        await InvoiceModel.create({ patient, numInvoice, LineInvoice: [] })
        // END Create Invoice

        // Start Create Fiche
        let LineFiche = []
        for(let i=1; i<=15; i++) {
          LineFiche.push({ })
          if(i === 1) {
            LineFiche[0].dateAppointment = createdAt
          }
        }
        const latestFiche = await FicheModel.findOne({ patient }).sort({ createdAt: -1 })
        let numFiche = latestFiche?.numInvoice ?? 0
        numFiche++
        await FicheModel.create({ doctor, patient, numFiche, LineFiche })
        // END Create Fiche
      } // finish check RegNo

      if(method?._id?.length === 0) {
        method = null
      }

      await PaymentModel.create({ user, doctor, type, patient, amount, method, supported, createdAt, invoiceAssur })      
      
      if(type === "payment") {
        const patientInfo = await PatientModel.findOne({ _id: patient })
        const prevBalance = patientInfo.balance
        const newBalance = Number(prevBalance) + Number(amount)
        patientInfo.balance = newBalance
        await patientInfo.save()
      }
      request.query.patient = patient
      await getPayments(request, response)
    } else {
      response.status(300).json({ formErrors })
    }
  } catch(err) {
    console.log("err: ", err)
    response.status(500).json({ err: err.message })
  }
}

const updatePayment = async (request, response) => {
  try {
    // versement
    const { id } = request.params
    let { user, doctor, patient, amount, type, method, supported, createdAt } = request.body
    const formErrors = []
    const paymentInfo = await PaymentModel.findOne({_id: id})
    if(amount.length === 0 || amount === 0) {
      amount = paymentInfo.amount
    }
    if(method?._id?.length === 0) {
      method = null
    } 

    let invoiceAssur = null
    // Start keep invoice assurance
    let patientInfo   = await PatientModel.findOne({ _id: patient })

    const { assurance } = patientInfo
    const AssInfo = await AssuranceModel.findOne({ _id: assurance.society })
    const invoiceAssurance = AssInfo?.invoices.find(invoice => !invoice.finish)    
    
    if(AssInfo && supported?.length === 0) {
      // formErrors.push("Donner la prise en charge")
    } 
    // END keep invoice assurance
    if(Object.assign(assurance).length > 0) {
      if(supported?.length === 0) {
        supported = null
      } else {
        supported = parseInt(supported) + "/" + new Date().getFullYear()
        if(!invoiceAssurance) {
          formErrors.push("Le patient est assuré par une societe que vous n'avez pas encore creer sa facture")
          formErrors.push("Veuillez creer une facture pour cette societe d'assurance")
        } else {
          invoiceAssur = invoiceAssurance._id
        }
      }
    }

    if(formErrors.length === 0) {
      if(type === "payment") {
        const patientInfo = await PatientModel.findOne({ _id: patient })
        const prevBalance = patientInfo.balance
        const newBalance = Number(prevBalance) - Number(paymentInfo.amount) + Number(amount)
        patientInfo.balance = newBalance
        await patientInfo.save()
      }
      
      createdAt = new Date(createdAt)
      createdAt.setHours(new Date().getHours())
      createdAt.setMinutes(new Date().getMinutes())
      createdAt.setSeconds(new Date().getSeconds())

      await PaymentModel.updateOne({_id: id}, { user, doctor, type, patient, amount, method, supported, createdAt })
      request.query.patient = patient
      await getPayments(request, response)
    } else {
      response.status(300).json({ formErrors })
    }
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}


const deletePayment = async (request, response) => {
  try {
    const { id } = request.params
    const { patient } = await PaymentModel.findOne({ _id: id })
    const paymentInfo = await PaymentModel.findOne({_id: id})
    if(paymentInfo.type === "payment") {
      const patientInfo = await PatientModel.findOne({ _id: patient })
      const prevBalance = patientInfo.balance
      const newBalance = Number(prevBalance) - Number(paymentInfo.amount)
      patientInfo.balance = newBalance
      await patientInfo.save()
    }

    request.query.patient = patient

    await PaymentModel.deleteOne({_id: id})
    
    await getPayments(request, response)
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}

module.exports = { getPayments, createPayment, updatePayment, deletePayment }
