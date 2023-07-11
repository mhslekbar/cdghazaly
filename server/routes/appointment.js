const router = require("express").Router()
const { getDays, createDay, editDay, deleteDay } = require("../controllers/Appointment/DayOfWorkController")

const { getSettingAppoint, createSettingAppoint, updateSettingAppoint, deleteSettingAppoint } = require("../controllers/Appointment/SetAppointmentController") 

const { getAppointments, createAppointment, deleteAppointment, sendMessage } = require("../controllers/Appointment/AppointmentController")

router.get("/:doctor", getAppointments)
router.post("/:doctor", createAppointment)
router.delete("/:doctor/:id", deleteAppointment)

router.post("/send-message/msg", sendMessage)

router.get("/dayOfWork/:doctor", getDays)
router.post("/dayOfWork/:doctor", createDay)
router.put("/dayOfWork/:doctor/:id", editDay)
router.delete("/dayOfWork/:doctor/:id", deleteDay)

router.get("/setAppointment/:doctor", getSettingAppoint)
router.post("/setAppointment/:doctor", createSettingAppoint)
router.put("/setAppointment/:doctor/:id", updateSettingAppoint)
router.delete("/setAppointment/:doctor/:id", deleteSettingAppoint)

module.exports = router
