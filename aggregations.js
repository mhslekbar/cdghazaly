const invoices = await FicheModel.aggregate([
  { $match: { patient } },
  { $lookup: {
    from: 'invoice', // Replace with the actual collection name for the Invoice model
    localField: 'LineFiche.lineInvoice',
    foreignField: '_id',
    as: 'LineFiche.lineInvoice'
  }},
  { $lookup: {
    from: 'user', // Replace with the actual collection name for the User model
    localField: 'LineFiche.doctor',
    foreignField: '_id',
    as: 'LineFiche.doctor'
  }},
  { $lookup: {
    from: 'payment', // Replace with the actual collection name for the Payment model
    localField: 'LineFiche.payment',
    foreignField: '_id',
    as: 'LineFiche.payment'
  }},
  { $lookup: {
    from: 'appointment', // Replace with the actual collection name for the Appointment model
    localField: 'LineFiche.appointment',
    foreignField: '_id',
    as: 'LineFiche.appointment'
  }},
  { $sort: { createdAt: -1 } }
]);

console.log(invoices);


const fiches = await FicheModel
.find({ patient })
.populate("patient")
.populate("LineFiche.doctor")
.populate("LineFiche.payment")
// .populate("LineFiche.lineInvoice")
.populate({
  path: 'LineFiche',
  populate: {
    path: 'lineInvoice'
  }
})
.populate("LineFiche.appointment")






const patientId = new mongoose.Types.ObjectId(patient);

const fiches = await FicheModel.aggregate([
  { $match: { patient: patientId } },
  {
    $lookup: {
      from: 'patient', // Replace with the actual collection name for the Patient model
      localField: 'patient',
      foreignField: '_id',
      as: 'patient',
    },
  },
  // {
  //   $lookup: {
  //     from: 'user', // Replace with the actual collection name for the User model
  //     localField: 'LineFiche.doctor',
  //     foreignField: '_id',
  //     as: 'LineFiche.doctor',
  //   },
  // },
  // {
  //   $lookup: {
  //     from: 'payment', // Replace with the actual collection name for the Payment model
  //     localField: 'LineFiche.payment',
  //     foreignField: '_id',
  //     as: 'LineFiche.payment',
  //   },
  // },
  // {
  //   $lookup: {
  //     from: 'invoice.LineInvoice', // Replace with the actual collection name for the LineInvoice model
  //     localField: 'LineFiche.lineInvoice',
  //     foreignField: '_id',
  //     as: 'LineFiche.lineInvoice',
  //   },
  // },
  // {
  //   $lookup: {
  //     from: 'appointment', // Replace with the actual collection name for the Appointment model
  //     localField: 'LineFiche.appointment',
  //     foreignField: '_id',
  //     as: 'LineFiche.appointment',
  //   },
  // },
  { $sort: { createdAt: -1 } },
  { 
    $project: {
      _id: 1,
      patient: 1,
      numFiche: 1,
      LineFiche: 0
    }
  }
]);


console.log("fiches: ", fiches)
