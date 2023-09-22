const InvoiceModel = require("../models/InvoiceModel");
const DevisModel = require("../models/DevisModel");

const getInvoices = async (request, response) => {
  try {
    const { patient } = request.params
    let invoices
    if(patient) {
      invoices = await InvoiceModel
      .find({ patient })
        .populate("patient")
        .populate("LineInvoice.doctor")
        .populate("LineInvoice.treatment")
        .populate("LineInvoice.devis")
      .sort({ createdAt: -1 })
    } else {
      invoices = await InvoiceModel
      .find()
        .populate("patient")
        .populate("LineInvoice.doctor")
        .populate("LineInvoice.treatment")
        .populate("LineInvoice.devis")
      .sort({ createdAt: -1 })
    }

    response.status(200).json({ success: invoices })
  } catch(err) {
    response.status(500).json({ err: err.message })
  }
}

const getAllDevis = async (request, response) => {
  try {
    const { patient } = request.params

    // Find all invoices for the patient
    const invoices = await InvoiceModel.find({ patient });
    const devisData = await DevisModel.find({
      patient
    })
      .populate("patient")
      .populate("LineDevis.doctor")
      .populate("LineDevis.treatment")
      .sort({ numDevis : 1 })
  

    const filteredDevisModels = devisData.flatMap((devis) => {
      const remainingLines = [];
    
      devis.LineDevis.forEach((lineDevis) => {
        const matchingInvoices = invoices.filter((invoice) =>
          invoice.LineInvoice.some(
            (invoiceLine) =>
              invoiceLine.devis.toString() === devis._id.toString() &&
              invoiceLine.treatment.toString() === lineDevis.treatment._id.toString()
          )
        );
    
        if (matchingInvoices.length > 0) {
          const totalNumsLength = matchingInvoices.reduce((sum, invoice) => {
            const matchingLines = invoice.LineInvoice.filter(
              (invoiceLine) =>
                invoiceLine.devis.toString() === devis._id.toString() &&
                invoiceLine.treatment.toString() === lineDevis.treatment._id.toString()
            );
            return sum + matchingLines.reduce((lineSum, line) => lineSum + line.teeth.nums.length, 0);
          }, 0);
    
          if (totalNumsLength !== lineDevis.teeth.nums.length) {            
            // Only some teeth of this treatment are finished
            remainingLines.push(
              Object.assign(lineDevis, {
                teeth: {
                  ...lineDevis.teeth,
                  nums: lineDevis.teeth.nums.filter(
                    (num) =>
                      matchingInvoices.every((invoice) =>
                        invoice.LineInvoice.every(
                          (line) =>
                            line.devis.toString() !== devis._id.toString() ||
                            line.treatment.toString() !== lineDevis.treatment._id.toString() ||
                            !line.teeth || !line.teeth.nums || !line.teeth.nums.includes(num)
                        )
                      )
                  ),
                  price: lineDevis.price
                  // price: devis.reduce ? lineDevis.price - (lineDevis.price * devis.reduce / 100) : lineDevis.price
                }
              })
            );
          }
        } else {
          // Treatment does not exist in any invoice
          remainingLines.push(
            Object.assign(lineDevis, { 
              price: lineDevis.price 
              // price: devis.reduce ? lineDevis.price - (lineDevis.price * devis.reduce / 100) : lineDevis.price 
            })
          );
        }
      });
      return [Object.assign(devis, { LineDevis: [...remainingLines] })];
    });
    response.status(200).json({ success: filteredDevisModels })
  } catch(err) {
    console.log("err: ", err)
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
      if(latestInvoice?.numInvoice) {
        latestInvoice.finish = true
        await latestInvoice.save()
      }
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

module.exports = { getInvoices, getAllDevis, createInvoice, deleteInvoice }




      // const filteredDevisModels = devisData.flatMap((devis) => {
      //   const remainingLines = [];
      
      //   devis.LineDevis.forEach((lineDevis) => {
      //     const matchingInvoice = invoices.find((invoice) =>
      //       invoice.LineInvoice.some(
      //         (invoiceLine) =>
      //           invoiceLine.devis.toString() === devis._id.toString() &&
      //           invoiceLine.treatment.toString() === lineDevis.treatment._id.toString()
      //       )
      //     );
      
      //     if (matchingInvoice) {
      //       const matchingLine = matchingInvoice.LineInvoice.find(
      //         (invoiceLine) =>
      //           invoiceLine.devis.toString() === devis._id.toString() &&
      //           invoiceLine.treatment.toString() === lineDevis.treatment._id.toString()
      //       );
      
      //       if (matchingLine) {
      //         // matchingLine.teeth && matchingLine.teeth.nums && 
      //         if (!(matchingLine.teeth.nums.length === lineDevis.teeth.nums.length)) {
      //           // Only some teeth of this treatment are finished
      //           console.log("rest 1: ", lineDevis.treatment.name)
      //           remainingLines.push(Object.assign(lineDevis,{
      //             teeth: {
      //               ...lineDevis.teeth,
      //               nums: lineDevis.teeth.nums.filter(
      //                 (num) => matchingLine.teeth && matchingLine.teeth.nums && !matchingLine.teeth.nums.includes(num)
      //               ),
      //               price: devis.reduce ? lineDevis.price - (lineDevis.price * devis.reduce / 100) : lineDevis.price
      //             },
      //           }))
      //         } 
      //       } else {
      //         console.log("not rest: ", lineDevis.treatment.name)
      //         // Treatment does not exist in the invoice
      //         remainingLines.push(Object.assign(lineDevis, { price: devis.reduce ? lineDevis.price - (lineDevis.price * devis.reduce / 100) : lineDevis.price }));
      //       }
      //     } else {
      //       console.log("doesn't exist: ", lineDevis.treatment.name)
      //       // Treatment does not exist in the invoice
      //       remainingLines.push(Object.assign(lineDevis, { price: devis.reduce ? lineDevis.price - (lineDevis.price * devis.reduce / 100) : lineDevis.price }));
      //     }
      //   });
      //   return [Object.assign(devis, {LineDevis: [...remainingLines]})];
      // });      