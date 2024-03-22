const { convertToHoursMins, strToTime } = require("../../functions/functions")
const SetAppointmentModel = require("../../models/SetAppointmentModel")

const getSettingAppoint = async (request, response) => {
  try {
    const { doctor } = request.params
    const setting = await SetAppointmentModel
    .find({ doctor })
    .populate("doctor")
    .sort({ createdAt: 1 })
    response.status(200).json({ success: setting })
  } catch(error) {
    response.status(500).json({ error: error.message })
  }
}

const createSettingAppoint = async (request, response) => {
  try {
    const { doctor } = request.params
    const { start, end, partOfTime, countSeance } = request.body
    
    const formErrors = []
    const check = await SetAppointmentModel.findOne({ doctor, partOfTime })
    
    if(check) {
      formErrors.push("deja existe")
    }
    if(partOfTime.length === 0) {
      formErrors.push(`Choisir un temps partiel`)
    }
    if(start.length === 0 && partOfTime.length > 1) {
      formErrors.push(`Donner la date du debut du : ${partOfTime}`)
    }
    if(end.length === 0 && partOfTime.length > 1) {
      formErrors.push(`Donner la date du descente du :${partOfTime}`)
    }

    if(formErrors.length === 0) {
      const startTime = new Date()
      const hourStart = start.split(":")[0]
      const minuteStart = start.split(":")[1]
      startTime.setHours(hourStart)
      startTime.setMinutes(minuteStart)
      
      const endTime = new Date()
      const hourEnd = end.split(":")[0]
      const minuteEnd = end.split(":")[1]
      endTime.setHours(hourEnd)
      endTime.setMinutes(minuteEnd)
      
      const hourDiff = Math.round((strToTime(endTime) - strToTime(startTime)) / 3600, 1);
      const hDf = hourDiff / countSeance;
      const time = convertToHoursMins(hDf * 60)      

      await SetAppointmentModel.create({ doctor, start, end, partOfTime, time, countSeance })
      await getSettingAppoint(request, response)

    } else {
      response.status(300).json({ formErrors })
    }
  } catch(error) {
    response.status(500).json({ error: error.message })
  }
}

const updateSettingAppoint = async (request, response) => {
  try {
    const { doctor, id } = request.params;
    const { start, end, partOfTime, countSeance } = request.body;
    
    const formErrors = [];
    const checkSetAppoint = await SetAppointmentModel.findOne({ _id: { $ne: id }, partOfTime });

    if(partOfTime.length === 0) {
      formErrors.push(`Choisir un temps partiel`);
    }
    if(start.length === 0 && partOfTime.length > 1) {
      formErrors.push(`Donner la date du debut du :${partOfTime}`);
    }
    if(end.length === 0 && partOfTime.length > 1) {
      formErrors.push(`Donner la date du descente du :${partOfTime}`);
    }

    if(formErrors.length === 0) {
      const startTime = new Date();
      let hourStart = parseInt(start.split(":")[0]);
      const minuteStart = parseInt(start.split(":")[1]);
      startTime.setHours(hourStart);
      startTime.setMinutes(minuteStart);
      
      const endTime = new Date();
      let hourEnd = parseInt(end.split(":")[0]);
      const minuteEnd = parseInt(end.split(":")[1]);
      if(hourStart > hourEnd) {
          hourEnd += 24; // Adjust for the next day
      }      
      endTime.setHours(hourEnd);
      endTime.setMinutes(minuteEnd);

      const hourDiff = Math.round((strToTime(endTime) - strToTime(startTime)) / 3600);
      const hDf = hourDiff / countSeance;
      const time = convertToHoursMins(hDf * 60);      

      await SetAppointmentModel.updateOne({ _id: id }, { doctor, start, end, partOfTime, time, countSeance }, { new: true });
      await getSettingAppoint(request, response);
    } else {
      response.status(400).json({ formErrors });
    }
  } catch(error) {
    response.status(500).json({ error: error.message });
  }
};


const deleteSettingAppoint = async (request, response) => {
  try {
    const { id } = request.params
    await SetAppointmentModel.deleteOne({ _id: id })
    await getSettingAppoint(request, response)
  } catch(error){
    response.status(500).json({ error: error.message })
  }
}

module.exports = { getSettingAppoint, createSettingAppoint, updateSettingAppoint, deleteSettingAppoint }




// const updateSettingAppoint = async (request, response) => {
//   try {
//     const { doctor, id } = request.params
//     const { start, end, partOfTime, countSeance } = request.body
    
//     const formErrors = []

//     const checkSetAppoint = await SetAppointmentModel.findOne({ _id: { $ne: id }, partOfTime })

//     if(partOfTime.length === 0) {
//       formErrors.push(`Choisir un temps partiel`)
//     }
//     if(start.length === 0 && partOfTime.length > 1) {
//       formErrors.push(`Donner la date du debut du :${partOfTime}`)
//     }
//     if(end.length === 0 && partOfTime.length > 1) {
//       formErrors.push(`Donner la date du descente du :${partOfTime}`)
//     }

//     if(formErrors.length === 0) {
//       const startTime = new Date()
//       const hourStart = start.split(":")[0]
//       const minuteStart = start.split(":")[1]
//       startTime.setHours(hourStart)
//       startTime.setMinutes(minuteStart)
      
//       const endTime = new Date()
//       let hourEnd = end.split(":")[0]
//       const minuteEnd = end.split(":")[1]
//       endTime.setHours(hourEnd)
//       endTime.setMinutes(minuteEnd)
//       const hourDiff = Math.round((strToTime(endTime) - strToTime(startTime)) / 3600, 1);
//       const hDf = hourDiff / countSeance;
//       const time = convertToHoursMins(hDf * 60)      

//       console.log("hourStart: ", hourStart);
//       console.log("hourEnd: ", hourEnd);
      
//       // Check if the starting hour is greater than the ending hour
//       if(hourStart > hourEnd) {
//           // Add 24 to hourEnd to handle the next day scenario
//           hourEnd += 24;
//       }
      
//       console.log("Adjusted hourEnd: ", hourEnd);
//       console.log("result: ", hourEnd - hourStart);


//       await SetAppointmentModel.updateOne({ _id: id }, { doctor, start, end, partOfTime, time, countSeance }, { new: true })
//       await getSettingAppoint(request, response)

//     } else {
//       response.status(300).json({ formErrors })
//     }
//   } catch(error) {
//     // console.log("error: ", error)
//     response.status(500).json({ error: error.message })
//   }
// }

