const UserModel = require("../models/UserModel")
const LaboratoryModel = require("../models/LaboratoryModel")
const CryptoJS = require("crypto-js");
const DayOfWorkModel = require("../models/DayOfWorkModel");
const SetAppointmentModel = require("../models/SetAppointmentModel");
const PatientModel = require("../models/PatientModel");
const PaymentModel = require("../models/PaymentModel");
const DevisModel = require("../models/DevisModel");
const FicheModel = require("../models/FicheModel");
const InvoiceModel = require("../models/InvoiceModel");
const PurchaseOrderModel = require("../models/PurchaseOrderModel");

const { convertToHoursMins, strToTime, AllDayOfWork } = require("../functions/functions")

const getUsers = async (req, res) => {
  try {
    const { userId } = req.query
    let users
    if(userId) {
      users = await UserModel.findOne({ _id: userId }).populate("roles").sort({ createdAt: -1 });
    } else {
      users = await UserModel.find().populate("roles").sort({ createdAt: -1 });
    }
    res.status(200).json({ success: users })
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

const createUser = async (req, res) => {
  try {
    const { username, password, phone, roles, doctor } = req.body
    const formErrors = [];
    const checkUser = await UserModel.findOne({username});
    if(checkUser) {
      formErrors.push("Nom d'utilisateur Deja existe");
    }
    if(username.length === 0) {
      formErrors.push("Nom d'utilisateur est obligatoire !");
    }
    if(password.length === 0) {
      formErrors.push("Mot de passe est obligatoire !");
    }
    if(phone.length === 0) {
      formErrors.push("Numero de telephone est obligatoire !");
    }
    if(roles.length === 0) {
      formErrors.push("Donner au moins un role !");
    }
    
    const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString()

    if(formErrors.length === 0) {
      const newUser = await UserModel.create({ username, password: encryptedPassword, phone, roles, doctor })
      // Start Add this user into all previous lab
      if(Object.keys(doctor).length > 0) {
        const laboratory = await LaboratoryModel.find()
        laboratory.map(async labo =>{
          labo.accounts.push({ doctor: newUser._id, balance: 0 })
          await labo.save();
        })
        // Start create for this doctor day of work
        await DayOfWorkModel.create({ doctor: newUser._id, dayOfWork: AllDayOfWork})
        await createSetAppointment(newUser._id, "09:00", "14:00", 6, "matin")
        await createSetAppointment(newUser._id, "17:00", "21:00", 6, "soir")
        // End create for this doctor day of work
      }
      // End Add this user into all previous lab
      await getUsers(req, res)
    } else {
      res.status(300).json({ formErrors})
    }
  } catch (err) {
    console.log("err: ", err)
    res.status(500).json({ err: err.message })
  }
} 

const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const userData = await UserModel.findById(id)
    let { username, password, phone, roles, doctor } = req.body
    const formErrors = [];
    const checkUser = await UserModel.findOne({ _id: {$ne: id},  username });
    
    if(checkUser) {
      formErrors.push("Nom d'utilisateur Deja existe");
    }
    if(username.length === 0) {
      username = userData.username
    }
    if(password.length === 0) {
      password = userData.password
    }
    if(phone.length === 0) {
      phone = userData.phone
    }
    if(roles.length === 0) {
      roles = userData.roles
    }
    
    const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString()

    if(formErrors.length === 0) {
      await UserModel.updateOne({_id: id}, { username, password: encryptedPassword, phone, roles, doctor }, { new: true })
      await getUsers(req, res)
    } else {
      res.status(300).json({ formErrors})
    }

  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const formErrors = []
    // start check if there's a patient or if payment has made
    // end check if there's a patient or if payment has made
    if(formErrors.length === 0) {
      await DayOfWorkModel.deleteMany({ doctor: id })
      await SetAppointmentModel.deleteMany({ doctor: id })

      await PaymentModel.deleteMany({ doctor: id })
      await DevisModel.deleteMany({ "LineDevis.doctor": id })
      await FicheModel.deleteMany({ "LineFiche.doctor": id })
      await InvoiceModel.deleteMany({ "LineInvoice.doctor": id })
      
      const labo = await LaboratoryModel.findOne({ "accounts.doctor": id })
      if(labo) {
        LaboratoryModel.accounts = LaboratoryModel.accounts.filter(acc => !acc.doctor.equals(id))
        LaboratoryModel.payments = LaboratoryModel.payments.filter(payment => !payment.doctor.equals(id))
        LaboratoryModel.consumptions = LaboratoryModel.consumptions.filter(consumption => !consumption.doctor.equals(id))
        LaboratoryModel.patients = LaboratoryModel.patients.filter(patient => !patient.doctor.equals(id))
        await LaboratoryModel.save()
      }
      await PatientModel.deleteMany({ doctor: id })
      await PurchaseOrderModel.deleteMany({ doctor: id })
      
      await UserModel.findByIdAndDelete(id)
      await getUsers(req, res)
    } else {
      res.status(300).json({ formErrors })
    }
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

// this is just a simple function not a middleware 

var createSetAppointment = async (doctor, start, end, countSeance, partOfTime) => {
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
}

module.exports = { getUsers, createUser, updateUser, deleteUser }