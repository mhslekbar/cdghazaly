const FicheModel = require("../models/FicheModel");
const PaymentModel = require("../models/PaymentModel");
const InvoiceModel = require("../models/InvoiceModel");
const TreatmentModel = require("../models/TreatmentModel");
const LaboratoryModel = require("../models/LaboratoryModel");

const getFiches = async (request, response) => {
  try {
    const { patient } = request.params;
    const fiches = await FicheModel.find({ patient }).sort({ createdAt: -1 });
    response.status(200).json({ success: fiches });
  } catch (err) {
    response.status(500).json({ err: err.message });
  }
};

const createNewFiche = async (patient) => {
  const ficheData = await FicheModel.findOne({ patient }).sort({
    numFiche: -1,
  });
  let numFiche = ficheData?.numFiche || 0;
  numFiche++;
  let LineFiche = [];
  for (let i = 1; i <= 15; i++) {
    LineFiche.push({});
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
    FicheInfo.LineFiche = LineFiche;
    await FicheInfo.save();
    await getFiches(request, response);
  } catch (err) {
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
    } = request.body;
    const amount = price * Number(teeth.nums.length);

    const laboratoryInfo = await LaboratoryModel.findOne({ _id: laboratory });
    const ficheInfo = await FicheModel.findOne({ _id: ficheId, patient });

    const indexLineFiche = ficheInfo.LineFiche.findIndex((lf) =>
      lf._id.equals(lineFicheId)
    );

    clearDataPrevLineFiche(patient, ficheId, lineFicheId);

    // start create the payment
    const newPayment = await PaymentModel.create({
      user,
      doctor,
      patient,
      amount,
      type: "soins",
    });

    // start Add treatment in conso lab if prothese
    const treatmentInfo = await TreatmentModel.findOne({ _id: treatment });
    let consumptionLab, patientLab;
    if (treatmentInfo.type === "prothese") {
      const labTreatInfo = laboratoryInfo.treatments.find((treat) =>
        treat.treatment.equals(treatment)
      );

      const priceOfLab = labTreatInfo.price;
      const amountLab = Number(priceOfLab) * Number(teeth.nums.length);

      // START Update balance of lab
      let doctorAccountLabo = laboratoryInfo.accounts.find((acc) =>
        acc.doctor.equals(doctor)
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
      });

      const newConsoLab = await laboratoryInfo.save();
      consumptionLab =
        newConsoLab.consumptions[newConsoLab.consumptions.length - 1]._id;
      laboratoryInfo.patients.push({
        patient,
        consumptionLab,
        appointment,
      });
      const newPatientLab = await laboratoryInfo.save();
      patientLab =
        newPatientLab.patients[newPatientLab.patients.length - 1]._id;
    }

    // END Add treatment in conso lab if prothese

    // start add this treatment in invoice :
    // firstly check if there's an empty invoice
    // true ? append this treatment inside it
    // else create new invoice and append this treatment inside it
    
    const latestInvoice = await InvoiceModel.findOne({
      patient,
      finish: 0,
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
      invoiceInfo.LineInvoice.push({ doctor, treatment, devis, price, teeth });
    } else {
      invoiceInfo.LineInvoice.push({ doctor, devis, acte, price, teeth });
    }
    // save invoice data
    const savedInvoice = await invoiceInfo.save();
    const latestLine =
      savedInvoice.LineInvoice[savedInvoice.LineInvoice.length - 1];

    // get the `_id` latest line of this invoice
    const newLineInvoice = latestLine._id;

    // START Fiche

    Object.assign(ficheInfo.LineFiche[indexLineFiche], {
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
    console.log("err: ", err);
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
      finish: 0,
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
    await PaymentModel.deleteOne({ _id: prevPayment });
  }

  const prevInvoice = ficheInfo.LineFiche[indexLineFiche]?.lineInvoice;

  let lineInvoiceData;
  if (prevInvoice) {
    const invoiceData = await InvoiceModel.findOne({
      "LineInvoice._id": prevInvoice,
    });
    lineInvoiceData = invoiceData.LineInvoice.find((ln) =>
      ln._id.equals(prevInvoice)
    );
    invoiceData.LineInvoice = invoiceData.LineInvoice.filter(
      (ln) => !ln._id.equals(prevInvoice)
    );
    await invoiceData.save();
  }

  // Start Patient Labo

  const prevConsumptionLab =
    ficheInfo.LineFiche[indexLineFiche]?.consumptionLab;
  const laboratoryInfo = await LaboratoryModel.findOne({
    "consumptions._id": prevConsumptionLab,
  });

  // const prevPatientLab = ficheInfo.LineFiche[indexLineFiche]?.patientLab

  if (prevConsumptionLab) {
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
