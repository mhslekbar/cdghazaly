const PatientModel = require("../models/PatientModel");
const PaymentModel = require("../models/PaymentModel");
const AssuranceModel = require("../models/AssuranceModel");
const SettingModel = require("../models/SettingModel");
const FicheModel = require("../models/FicheModel");
const InvoiceModel = require("../models/InvoiceModel");
const DevisModel = require("../models/DevisModel");
const AppointmentModel = require("../models/AppointmentModel");
const LaboratoryModel = require("../models/LaboratoryModel");

const getPatients = async (request, response) => {
  try {
    const patients = await PatientModel.find()
      .populate("doctor")
      .sort({ RegNo: -1, createdAt: -1 });
    response.status(200).json({ success: patients });
  } catch (err) {
    response.status(500).json({ err: err.message });
  }
};

const createPatient = async (request, response) => {
  try {
    let { user, doctor, name, contact, yearOfBirth, assurance, address, method, supported, assure, isConsult } = request.body;

    let { cons_price } = await SettingModel.findOne();
    let dob = new Date();
    let date_archive = new Date();
    date_archive.setMonth(date_archive.getMonth() + 1);

    const checkPatient = await PatientModel.findOne({ name });

    if (checkPatient?.contact?.phone === contact.phone) {
      return response.status(200).json({ existPatient: true });
    }

    const formErrors = [];
    if (doctor.length === 0) {
      formErrors.push("Le doctor est obligatoire.");
    }
    if (name.length === 0) {
      formErrors.push("Le nom du patient est obligatoire.");
    }
    if (contact.phone.length === 0) {
      formErrors.push("Le telephone du patient est obligatoire.");
    }

    if (yearOfBirth.length === 0) {
      formErrors.push("Année de naissance du patient est obligatoire.");
    } else {
      dob.setFullYear(yearOfBirth);
    }

    let invoiceAssur = null

    if (assure) {
      if (assurance.society.length === 0) {
        formErrors.push("Choisir societe d'assurance.");
      }
      if (assurance.professionalId.length === 0) {
        formErrors.push("Donner le matricule.");
      }
      if (supported?.length === 0) {
        formErrors.push("Donner la prise en charge.");
      }

      if (
        assurance.percentCovered.length === 0 ||
        assurance.percentCovered === 0
      ) {
        formErrors.push("Donner le pourcentage.");
      } else {
        const societyInfo = await AssuranceModel.findOne({
          _id: assurance.society,
        });
        cons_price = societyInfo.cons_price;
        supported = supported + "/" + new Date().getUTCFullYear();

        // Start keep invoice assurance
        const invoiceAssurance = societyInfo?.invoices.find(invoice => !invoice.finish)    
        // const invoiceAssurance = societyInfo?.invoices.find(invoice => !invoice.finish)  
        invoiceAssur = invoiceAssurance._id
      }

    } else {
      assurance = {};
      supported = null;
    }

    if (!isConsult) {
      cons_price = 0;
      supported = null;
    }

    if (method.length === 0) {
      method = null;
    }

    if (formErrors.length === 0) {
      let newPatient;
      newPatient = await PatientModel.create({ doctor: doctor, name, contact, address, dob, assurance, date_archive });
      await PaymentModel.create({ user, doctor, patient: newPatient._id, amount: cons_price, type: "consultations", method, supported, invoiceAssur });
      await getPatients(request, response);
    } else {
      response.status(300).json({ formErrors });
    }
  } catch (err) {
    response.status(500).json({ err: err.message });
  }
};

const updatePatient = async (request, response) => {
  try {
    const { id } = request.params;
    let {
      doctor, name, contact, HealthCondition, dob, assurance, method, supported, address, assure,
    } = request.body;

    const patientInfo = await PatientModel.findOne({ _id: id });
    const paymentInfo = await PaymentModel.findOne({ patient: id, type: "consultations" });
    
    let cons_price = paymentInfo.amount;
    const formErrors = [];
    if (doctor.length === 0) {
      doctor = patientInfo.doctor;
    }
    if (name.length === 0) {
      name = patientInfo.name;
    }
    if (contact.phone.length === 0) {
      contact = {
        phone: patientInfo.phone,
        whatsApp: patientInfo.whatsApp,
      };
    }
    if (HealthCondition?.length === 0) {
      HealthCondition = patientInfo?.HealthCondition;
    }
    if (dob.length === 0) {
      dob = patientInfo.dob;
    }
    if (assurance.length === 0) {
      assurance = patientInfo.assurance;
    }

    if (assure) {
      if (assurance.society?.length === 0) {
        formErrors.push("Choisir societe d'assurance.");
      }
      if (assurance.professionalId?.length === 0) {
        formErrors.push("Donner le matricule.");
      }
      if (supported?.length === 0) {
        formErrors.push("Donner la prise en charge.");
      }
      if (
        assurance.percentCovered.length === 0 ||
        assurance.percentCovered === 0
      ) {
        formErrors.push("Donner le pourcentage.");
      } else {
        const societyInfo = await AssuranceModel.findOne({
          _id: assurance.society,
        });
        cons_price = societyInfo.cons_price ?? paymentInfo.amount;
        supported = supported + "/" + new Date().getUTCFullYear();
      }
    } else {
      assurance = {};
      supported = null;
    }
    if (method.length === 0) {
      method = null;
    }

    if (formErrors.length === 0) {
      await PatientModel.updateOne(
        { _id: id },
        { doctor, name, contact, HealthCondition, dob, assurance, address },
        { new: true }
      );
      // Start Edit payment
      paymentInfo.amount = cons_price;
      paymentInfo.method = method;
      paymentInfo.supported = supported;
      paymentInfo.save();
      // END Edit payment
      await getPatients(request, response);
    } else {
      response.status(300).json({ formErrors });
    }
  } catch (err) {
    console.log("err: ", err)
    response.status(500).json({ err: err.message });
  }
};

const deletePatient = async (request, response) => {
  try {
    const { id } = request.params;
    await PaymentModel.deleteMany({ patient: id });
    await FicheModel.deleteMany({ patient: id });
    await DevisModel.deleteMany({ patient: id });
    await InvoiceModel.deleteMany({ patient: id });
    await AppointmentModel.deleteMany({ patient: id });
    
    // START find laboratory With Consumptions
    const laboConsumption = await LaboratoryModel.findOne({ "consumptions.patient": id })
    if(laboConsumption) {
      laboConsumption.consumptions = laboConsumption.consumptions.filter(consumption => !consumption.patient.equals(id))
      await laboConsumption.save()
    }
    // END find laboratory With Consumptions
    
    // START find laboratory With Patients
    const laboPatients = await LaboratoryModel.findOne({ "patients.patient": id })
    if(laboPatients) {
      laboPatients.consumptions = laboPatients.patients.filter(patient => !patient.patient.equals(id))
      await laboPatients.save()
    }
    // END find laboratory With Consumptions

    await PatientModel.deleteOne({ _id: id });
    await getPatients(request, response);
  } catch (err) {
    response.status(500).json({ err: err.message });
  }
};

const passPatient = async (request, response) => {
  try {
    const { patient } = request.body;
    let latestPatient = await PatientModel.findOne({
      RegNo: { $ne: null },
    }).sort({ RegNo: -1 });

    let latestMatricule = latestPatient?.RegNo ?? 0;
    let newMatricule = latestMatricule + 1;
    
    let patientInfo = await PatientModel.findOne({ _id: patient });
    patientInfo.RegNo = newMatricule;
    patientInfo.save();
    
    // START create A File
    let LineFiche = [];
    for (let i = 1; i <= 15; i++) {
      LineFiche.push({});
      if(i === 1) {
        LineFiche[0].dateAppointment = new Date()
      }
    }
    await FicheModel.create({ doctor: patientInfo.doctor, patient, numFiche: 1, LineFiche });
    // END create A File

    await getPatients(request, response);
  } catch (err) {
    response.status(500).json({ err: err.message });
  }
};

const finishPatient = async (request, response) => {
  try {
    const { patient } = request.body;
    await PatientModel.updateOne({ _id: patient }, { finish: true }, { new: true });
    await getPatients(request, response);
  } catch (err) {
    response.status(500).json({ err: err.message });
  }
};

const returnPatient = async (request, response) => {
  try {
    let { user, patient, doctor, method, supported } = request.body;
    const formErrors = []
    
    const patientData = await PatientModel.findOne({ _id: patient })
    const { assurance  } = patientData
    let amount

    let invoiceAssur = null

    if(assurance.society) {
      const societyInfo = await AssuranceModel.findOne({
        _id: assurance.society,
      });
      amount = societyInfo.cons_price;

      const invoiceAssurance = societyInfo?.invoices.find(invoice => !invoice.finish)    
      // const invoiceAssurance = societyInfo?.invoices.find(invoice => !invoice.finish)    
      invoiceAssur = invoiceAssurance._id

      if(supported.length === 0) {
        formErrors.push("Donner la prise en charge")
      } else {
        supported = supported + "/" + new Date().getUTCFullYear();
      }
    } else {
      let { cons_price } = await SettingModel.findOne();
      amount = cons_price
      supported = null
    }

    if(method.length === 0) {
      method = null
    }
    if(formErrors.length === 0) {
      await PatientModel.updateOne({ _id: patient }, { finish: false }, { new: true });
      await PaymentModel.create({ user, doctor, patient, type: "consultations", amount, method, supported, invoiceAssur })
      await getPatients(request, response);
    } else {
      response.status(300).json({ formErrors })
    }
  } catch (err) {
    console.log("err: ", err)
    response.status(500).json({ err: err.message });
  }
};

module.exports = {
  getPatients,
  createPatient,
  updatePatient,
  passPatient,
  finishPatient,
  returnPatient,
  deletePatient,
};
