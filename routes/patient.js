const router = require("express").Router()
const { getPatients, createPatient, updatePatient, passPatient, finishPatient, deletePatient } = require("../controllers/PatientController")

router.get("/", getPatients)
router.post("/", createPatient)
router.put("/:id", updatePatient)
router.delete("/:id", deletePatient)

router.post("/passPatient", passPatient)
router.post("/finishPatient", finishPatient)

module.exports = router