const router = require("express").Router()
const { getDays, createDay, editDay, deleteDay } = require("../controllers/Appointment/DayOfWorkController")

const { getSettingAppoint, createSettingAppoint, updateSettingAppoint, deleteSettingAppoint } = require("../controllers/Appointment/SetAppointmentController") 

const { getAppointments, createAppointment, deleteAppointment, sendMessage } = require("../controllers/Appointment/AppointmentController")
const { authorizedPermission } = require("../middlewares/authorizedPermission");

router.get("/:doctor", authorizedPermission(["AFFICHER", "AFFICHER_GLOBAL"], "RDV"), getAppointments)
router.post("/:doctor", authorizedPermission(["AJOUTER"], "RDV"), createAppointment)
router.delete("/:doctor/:id", authorizedPermission(["SUPPRIMER"], "RDV"), deleteAppointment)

// authorizedPermission(["AFFICHER"], "RDV"),
// router.post("/send-message/msg", sendMessage)

router.get("/dayOfWork/:doctor", authorizedPermission(["AFFICHER"], "JOUR_RDV"), getDays)
router.post("/dayOfWork/:doctor", authorizedPermission(["MODIFIER"], "JOUR_RDV"), createDay)

router.get("/setAppointment/:doctor", authorizedPermission(["AFFICHER"], "FIXER_RDV"), getSettingAppoint)
router.post("/setAppointment/:doctor", createSettingAppoint)
router.put("/setAppointment/:doctor/:id", authorizedPermission(["MODIFIER"], "FIXER_RDV"), updateSettingAppoint)
router.delete("/setAppointment/:doctor/:id", deleteSettingAppoint)

module.exports = router
