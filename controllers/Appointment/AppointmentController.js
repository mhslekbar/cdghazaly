const AppointmentModel = require("../../models/AppointmentModel")

const createAppointment = async (request, response) => {
  try {
    const { doctor } = request.params
    const { patient, date, time, numSeance, partOfTime } = request.body
    
    const formErrors = []
    
    const checkAppointment = await AppointmentModel.findOne({ date, time  })
    // const checkAppointment = await AppointmentModel.findOne({ date, numSeance, partOfTime  })

    if(patient.length === 0) {
      formErrors.push("Le patient est obligatoire")
    }
    if(date.length === 0) {
      formErrors.push("Date de rendez-vous est obligatoire")
    }
    if(time.length === 0) {
      formErrors.push("Heure de rendez-vous est obligatoire")
    }

    if(formErrors.length === 0) {

    } else {
      response.status(300).json({ formErrors })
    }
  } catch(error) {
    response.status(500).json({ error: error.message })
  }
}