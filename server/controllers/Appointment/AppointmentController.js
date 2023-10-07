const AppointmentModel = require("../../models/AppointmentModel");
const FicheModel = require("../../models/FicheModel");
const LaboratoryModel = require("../../models/LaboratoryModel");
const { createNewFiche } = require("../FicheController");
const twilio = require('twilio');

const getAppointments = async (request, response) => {
  try { 
    const { doctor } = request.params
    const appointment = await AppointmentModel
    .find({ doctor })
    .populate("doctor")
    .populate("patient")
    response.status(200).json({ success: appointment })
  } catch(error) {
    response.status(500).json({ error: error.message })
  }
}

const createAppointment = async (request, response) => {
  try {
    const { doctor } = request.params;
    const { patient, date, time, numSeance, partOfTime, patientLab } = request.body;
    
    const formErrors = [];

    // const checkAppointment = await AppointmentModel.findOne({ date, time });
    const checkAppointment = await AppointmentModel.findOne({ doctor, date, numSeance, partOfTime  })
    
    if (checkAppointment) {
      formErrors.push("Le rendez-vous existe deja");
    }
    if (patient?.length === 0) {
      formErrors.push("Le patient est obligatoire");
    }
    if (!patient) {
      formErrors.push("Le patient est obligatoire");
    }
    if (date.length === 0) {
      formErrors.push("Date de rendez-vous est obligatoire");
    }
    if (time.length === 0) {
      formErrors.push("Heure de rendez-vous est obligatoire");
    }

    if (formErrors.length === 0) {
      const appoint = await AppointmentModel.create({ doctor, patient, date, time, numSeance, partOfTime })
      const fichePatient = await FicheModel.findOne({ patient }).sort({
        createdAt: -1
      });

      let sortedFiche, findIndexEmptyAppoint = -1

      if(fichePatient) {
        // START sort Array Fiche
        sortedFiche = fichePatient.LineFiche.sort((a, b) => {
          const dateA = a.dateAppointment ? new Date(a.dateAppointment) : null;
          const dateB = b.dateAppointment ? new Date(b.dateAppointment) : null;

          if (dateA === null && dateB === null) {
            return 0; // Both dates are undefined, maintain the current order
          }
          if (dateA === null) {
            return 1; // dateA is undefined, place it after dateB
          }
          if (dateB === null) {
            return -1; // dateB is undefined, place it after dateA
          }
          return dateB - dateA ; // Compare the valid date values
        });
        // END sort Array Fiche
        findIndexEmptyAppoint = sortedFiche.findIndex(f => !f.dateAppointment)
      }

      if(findIndexEmptyAppoint > -1) {
        Object.assign(sortedFiche[findIndexEmptyAppoint], { dateAppointment: date, appointment: appoint._id })
      } else {
        const newFiche = await createNewFiche(patient)
        const findIndexNewFiche = newFiche.LineFiche.findIndex(f => !f.dateAppointment)
        Object.assign(newFiche[findIndexNewFiche], { dateAppointment: date, appointment: appoint._id })
        newFiche.save();
      }

      if(patientLab) {
        const lab = await LaboratoryModel.findOne({"patients._id": patientLab._id})
        const findPatientIndex = lab.patients.findIndex(patient => patient._id.equals(patientLab._id))
        if(findPatientIndex > -1) {
          lab.patients[findPatientIndex].appointment = appoint._id
        }
        await lab.save()
      }

      await fichePatient.save()
      await getAppointments(request, response)

    } else {
      response.status(300).json({ formErrors });
    }
  } catch (error) {
    console.log("error: ", error)
    response.status(500).json({ error: error.message });
  }
};

const deleteAppointment = async (request, response) => {
  try {
    const {  id } = request.params
    
    const FicheInfo = await FicheModel.findOne({ "LineFiche.appointment": id })
    if(FicheInfo) {
      const findIndexAppoint = FicheInfo.LineFiche.findIndex(f => f.appointment?.equals(id))
      Object.assign(FicheInfo.LineFiche[findIndexAppoint], {
        doctor: undefined,
        acte: undefined,
        amount: undefined,
        payment: undefined,
        lineInvoice: undefined,
        consumptionLab: undefined,
        appointment: undefined,
        dateAppointment: null,
        finish: false,
      })
      await FicheInfo.save()
    }
    await AppointmentModel.deleteOne({ _id: id})
    await getAppointments(request, response)

  } catch (error) {
    response.status(500).json({ error: error.message })
  }
}

const sendMessage = (request, response) => {
  const { phoneNumbers, message } = request.body;
  console.log("phoneNumbers: ", phoneNumbers)

  const accountSid = 'ACad2ab43d413decf65353be3b0ebc6220';
  const authToken = '0bbb47c9b33ab2b7e74ac26d32a898c9';
  const client = twilio(accountSid, authToken);

  const sendWhatsAppMessage = async (to, body) => {
    try {
      const message = await client.messages.create({
        body: body,
        from: 'whatsapp:+14155238886',
        to: `whatsapp:${to}`
      });
      console.log(`WhatsApp message sent with SID: ${message.sid}`);
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
    }
  }
  sendWhatsAppMessage('+22226145050', message)


  // Promise.all(
  //   phoneNumbers.map((recipient) => {
  //     return client.messages.create({
  //       body: message,
  //       from: `+14847158376`,
  //       to: `${recipient}`,
  //     });
  //   })
  // )
  //   .then(() => {
  //     response.status(200).json({ success: true });
  //   })
  //   .catch((error) => {
  //     console.error('Error sending messages:', error);
  //     response.status(500).json({ success: false, error: 'Failed to send messages' });
  //   });
}

module.exports = { getAppointments, createAppointment, deleteAppointment, sendMessage };
