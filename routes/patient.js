const router = require("express").Router()
const { getPatients, createPatient, updatePatient, passPatient, finishPatient, returnPatient, deletePatient } = require("../controllers/PatientController")

router.get("/", getPatients)
router.post("/", createPatient)
router.put("/:id", updatePatient)
router.delete("/:id", deletePatient)

router.post("/passPatient", passPatient)
router.post("/finishPatient", finishPatient)
router.post("/returnPatient", returnPatient)

module.exports = router