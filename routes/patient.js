const router = require("express").Router()
const { getPatients, createPatient, updatePatient, deletePatient } = require("../controllers/PatientController")

router.get("/", getPatients)
router.post("/", createPatient)
router.put("/:id", updatePatient)
router.delete("/:id", deletePatient)

module.exports = router