const FicheModel = require("../models/FicheModel");
const PaymentModel = require("../models/PaymentModel");
const PatientModel = require("../models/PatientModel");
const InvoiceModel = require("../models/InvoiceModel");
const TreatmentModel = require("../models/TreatmentModel");
const LaboratoryModel = require("../models/LaboratoryModel");

const getFiches = async (request, response) => {
  try {
    const { patient } = request.params;
    const fiches = await FicheModel
      .find({ patient })
      .populate("patient")
      .populate("LineFiche.doctor")
      .populate("LineFiche.payment")
      .populate("LineFiche.appointment")
      .sort({ createdAt: -1 });

    const fichesAndInvoices = await Promise.all(fiches.map(async fiche => {
      return {
        _id: fiche._id,
        patient: fiche.patient,
        numFiche: fiche.numFiche,
        LineFiche: await Promise.all(fiche.LineFiche.map(async lineFiche => {
          let invoice = await InvoiceModel
            .findOne({ "LineInvoice._id": lineFiche.lineInvoice })
            .populate("patient")
            .populate("LineInvoice.doctor")
            .populate("LineInvoice.treatment")
            .populate("LineInvoice.devis");

          const findIndex = invoice ? invoice.LineInvoice.findIndex(LineInv => LineInv._id.equals(lineFiche.lineInvoice)) : -1;
          let activeLineInvoice;
          if (findIndex > -1) {
            activeLineInvoice = invoice.LineInvoice[findIndex];
          }

          return {
            ...lineFiche.toObject(),
            lineInvoice: activeLineInvoice,
          };
        })),
      };
    }));

    response.status(200).json({ success: fichesAndInvoices });
  } catch (err) {
    console.log("err: ", err)
    response.status(500).json({ err: err.message });
  }
};

// Just a function not a middleware
const createNewFiche = async (patient) => {
  const ficheData = await FicheModel.findOne({ patient }).sort({
    numFiche: -1,
  });
  let numFiche = ficheData?.numFiche || 0;
  numFiche++;
  let LineFiche = [];
  for (let i = 1; i <= 15; i++) {
    LineFiche.push({});
    // Here i want to check if it's the first fiche 
    // And i am in the first line of this fiche
    if(numFiche === 1 && i === 1) { 
      LineFiche[0].dateAppointment = new Date()
      // LineFiche[0].dateAppointment = createdAt
    }
  }
  return await FicheModel.create({ patient, numFiche, LineFiche }); 
}

const createFiche = async (request, response) => {
  try {
    const { patient } = request.params;
    await createNewFiche(patient)
    await getFiches(request, response);
  } catch (err) {
    response.status(500).json({ err: err.message });
  }
};

const updateFiche = async (request, response) => {
  try {
    const { id } = request.params;
    const { LineFiche } = request.body;

    const FicheInfo = await FicheModel.findOne({ _id: id });

    // i want to sort FicheInfo.LineFiche
    // because the result come from the front-end is sorted by dateAppointment
    const sortedArray = FicheInfo.LineFiche.sort((a, b) => (a.dateAppointment?.getTime() - b.dateAppointment?.getTime()))
    for(let index in LineFiche._id) {
      Object.assign(sortedArray[index], {
        _id: LineFiche._id[index],
        dateAppointment: LineFiche.dateAppointment[index],
        acte: LineFiche.acte[index],
        amount: LineFiche.amount[index],
      })
    }

    await FicheInfo.save();
    await getFiches(request, response);
  } catch (err) {
    console.log("err: ", err)
    response.status(500).json({ err: err.message });
  }
};

const deleteFiche = async (request, response) => {
  try {
    const { id } = request.params;
    await FicheModel.deleteOne({ _id: id });
    await getFiches(request, response);
  } catch (err) {
    response.status(500).json({ err: err.message });
  }
};

const updateLineFiche = async (request, response) => {
  try {
    const { patient, ficheId } = request.params;
    const {
      user,
      doctor,
      treatment,
      acte,
      price,
      teeth,
      devis,
      lineFicheId,
      laboratory,
      appointment, // id of appointment
      dateAppointment
    } = request.body;
    const amount = price * Number(teeth.nums.length);

    const ficheInfo = await FicheModel.findOne({ _id: ficheId, patient });

    const indexLineFiche = ficheInfo.LineFiche.findIndex((lf) =>
      lf._id.equals(lineFicheId)
    );

    await clearDataPrevLineFiche(patient, ficheId, lineFicheId);

    // start create the payment
    const newPayment = await PaymentModel.create({
      user,
      doctor,
      patient,
      amount,
      type: "soins",
      createdAt: dateAppointment,
      updateAt: dateAppointment,
    });

    const patientInfo = await PatientModel.findOne({ _id: patient })
    const prevBalancePatient = patientInfo?.balance || 0
    const newBalancePatient = Number(prevBalancePatient) - Number(amount)
    
    patientInfo.balance = newBalancePatient
    await patientInfo.save()

    // start Add treatment in conso lab if prothese
    const treatmentInfo = await TreatmentModel.findOne({ _id: treatment });
    let consumptionLab;
    if (treatmentInfo.type === "prothese") {
      let laboratoryInfo = await LaboratoryModel.findOne({ _id: laboratory });

      const labTreatInfo = laboratoryInfo.treatments.find((treat) =>
        treat.treatment.equals(treatment)
      );
      const priceOfLab = labTreatInfo.price;
      const amountLab = Number(priceOfLab) * Number(teeth.nums.length);

      // START Update balance of lab
      let doctorAccountLabo = laboratoryInfo.accounts.find((acc) =>
        acc.doctor.equals(doctor._id)
      );

      const prevBalanceLab = doctorAccountLabo.balance || 0;
      const newBalanceLab = Number(prevBalanceLab) - Number(amountLab);
      doctorAccountLabo.balance = newBalanceLab;

      await laboratoryInfo.save()
      // END Update balance of lab

      laboratoryInfo.consumptions.push({
        doctor,
        patient,
        treatment,
        teeth,
        price: priceOfLab,
        createdAt: dateAppointment,
        updateAt: dateAppointment,
      });

      const newConsoLab = await laboratoryInfo.save();
      consumptionLab =
        newConsoLab.consumptions[newConsoLab.consumptions.length - 1]._id;
      laboratoryInfo.patients.push({
        patient,
        consumptionLab,
        fingerPrintDate: dateAppointment,
        appointment,
        createdAt: dateAppointment,
        updateAt: dateAppointment,
      });
      await laboratoryInfo.save();

    }

    // END Add treatment in conso lab if prothese

    // start add this treatment in invoice :
    // firstly check if there's an empty invoice
    // true ? append this treatment inside it
    // else create new invoice and append this treatment inside it
    
    const latestInvoice = await InvoiceModel.findOne({
      patient,
      finish: false,
    }).sort({
      createdAt: -1,
    });

    let invoiceInfo = latestInvoice;
    if (!latestInvoice) {
      let numInvoice = latestInvoice?.numInvoice || 0;
      numInvoice++;
      invoiceInfo = await InvoiceModel.create({
        patient,
        numInvoice,
        LineInvoice: [],
      });
    }

    if (treatment) {
      invoiceInfo.LineInvoice.push({ doctor, treatment, devis, price, teeth, createdAt: dateAppointment, updateAt: dateAppointment, });
    } else {
      invoiceInfo.LineInvoice.push({ doctor, devis, acte, price, teeth, createdAt: dateAppointment, updateAt: dateAppointment, });
    }
    // save invoice data
    const savedInvoice = await invoiceInfo.save();
    const latestLine =
      savedInvoice.LineInvoice[savedInvoice.LineInvoice.length - 1];

    // get the `_id` latest line of this invoice
    const newLineInvoice = latestLine._id;

    // START Fiche

    Object.assign(ficheInfo.LineFiche[indexLineFiche], {
      appointment,
      doctor,
      acte,
      amount,
      payment: newPayment,
      lineInvoice: newLineInvoice,
      consumptionLab,
      finish: 1,
    });

    await ficheInfo.save();
    // END Fiche

    await getFiches(request, response);
  } catch (err) {
    console.log("err: ", err)
    response.status(500).json({ err: err.message });
  }
};

const deleteLineFiche = async (request, response) => {
  try {
    const { patient, ficheId, lineFicheId } = request.params;

    const ficheInfo = await FicheModel.findOne({ _id: ficheId });
    const indexLineFiche = ficheInfo.LineFiche.findIndex((lf) =>
      lf._id.equals(lineFicheId)
    );

    await clearDataPrevLineFiche(patient, ficheId, lineFicheId);

    Object.assign(ficheInfo.LineFiche[indexLineFiche], {
      doctor: undefined,
      acte: undefined,
      amount: undefined,
      payment: undefined,
      lineInvoice: undefined,
      consumptionLab: undefined,
      appointment: undefined,
      finish: false,
    })

    await ficheInfo.save();
    await getFiches(request, response);
    
  } catch (err) {
    response.status(500).json({ err: err.message });
  }
};


module.exports = {
  getFiches,
  createFiche,
  updateFiche,
  deleteFiche,
  updateLineFiche,
  deleteLineFiche,
  createNewFiche
};

var clearDataPrevLineFiche = async (patient, ficheId, lineFicheId) => {
  
  const ficheInfo = await FicheModel.findOne({ _id: ficheId });
  const indexLineFiche = ficheInfo.LineFiche.findIndex((lf) =>
    lf._id.equals(lineFicheId)
  );

  // start to delete previous info from line Fiche
  const prevPayment = ficheInfo.LineFiche[indexLineFiche]?.payment;
  if (prevPayment) {
    const Amount = ficheInfo.LineFiche[indexLineFiche].amount
    const patientInfo = await PatientModel.findOne({ _id: patient })
    const prevBalancePatient = patientInfo?.balance || 0
    const newBalancePatient = Number(prevBalancePatient) + Number(Amount)
    patientInfo.balance = Number(newBalancePatient)
    await patientInfo.save()
    const deletedPayment = await PaymentModel.deleteOne({ _id: prevPayment });
  }

  const prevInvoice = ficheInfo.LineFiche[indexLineFiche]?.lineInvoice;

  let lineInvoiceData;

  if (prevInvoice) {
    const invoiceData = await InvoiceModel.findOne({
      "LineInvoice._id": prevInvoice,
    });

    if(invoiceData) {
      lineInvoiceData = invoiceData.LineInvoice.find((ln) =>
        ln._id.equals(prevInvoice)
      );
      invoiceData.LineInvoice = invoiceData.LineInvoice.filter(
        (ln) => !ln._id.equals(prevInvoice)
      );      
      await invoiceData.save();
    }

  }
  // await InvoiceModel.updateMany({ _id: prevInvoice, "LineInvoice": invoiceData.LineInvoice }, { $set: invoiceData }, { new: true });
  // await InvoiceModel.updateMany({ _id: prevInvoice }, { $set: { "LineInvoice": invoiceData.LineInvoice } }, { new: true });


  // Start Patient Labo

  const prevConsumptionLab =
    ficheInfo.LineFiche[indexLineFiche]?.consumptionLab;

  // const prevPatientLab = ficheInfo.LineFiche[indexLineFiche]?.patientLab

  if (prevConsumptionLab) {
    const laboratoryInfo = await LaboratoryModel.findOne({
      "consumptions._id": prevConsumptionLab,
    });

    const { treatment, teeth, doctor } = lineInvoiceData;
    const labTreatInfo = laboratoryInfo.treatments.find((treat) =>
      treat.treatment.equals(treatment)
    );

    const priceOfLab = labTreatInfo.price;
    const amountLab = Number(priceOfLab) * Number(teeth.nums.length);

    // START Update balance of lab
    let doctorAccountLabo = laboratoryInfo.accounts.filter((acc) =>
      acc.doctor.equals(doctor)
    );
    const prevBalanceLab = doctorAccountLabo.balance || 0;
    const newBalanceLab = Number(prevBalanceLab) + Number(amountLab);
    doctorAccountLabo.balance = newBalanceLab;

    await laboratoryInfo.save();
    // END Update balance of lab

    // find this consumptions and delete it
    laboratory = await LaboratoryModel.findOne({
      "consumptions._id": prevConsumptionLab,
    });
    laboratory.consumptions = laboratory.consumptions.filter(
      (c) => !c._id.equals(prevConsumptionLab)
    );
    laboratory.patients = laboratory.patients.filter(
      (p) => !p.consumptionLab.equals(prevConsumptionLab)
    );

    await laboratory.save();
  }
  // END Patient Labo
  // END to delete previous info from line Fiche
};


// for (let i = 0; i < LineFiche._id.length; i++) {
//   const _id = LineFiche._id[i];
//   Object.assign(FicheInfo.LineFiche, {
//     [_id]: {
//       _id,
//       dateAppointment: LineFiche.dateAppointment[i],
//       acte: LineFiche.acte[i],
//       amount: LineFiche.amount[i],
//     }
//   });
// }

