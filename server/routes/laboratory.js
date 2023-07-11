const router = require("express").Router();
const { 
  getLabortories, createLabortory, updateLabortory, deleteLabortory, 
  getPatientsLab, finishPatientLab,
  getAccountsLab, getConsumptionsLab
 } = require("../controllers/Laboratory/LaboratoryController")
 const { 
  getTreatmentsLab, createTreatmentLab, updateTreatmentLab, deleteTreatmentLab 
 } = require("../controllers/Laboratory/TreatmentLabController")
 const { 
  getPaymentsLab, createPaymentLab, updatePaymentLab, deletePaymentLab
} = require("../controllers/Laboratory/PaymentLabController")

router.get("/", getLabortories)
router.post("/", createLabortory)
router.put("/:id", updateLabortory)
router.delete("/:id", deleteLabortory)

router.post("/consumptions", getConsumptionsLab)

router.get("/:labId/accounts", getAccountsLab)

// Start Patient Lab
router.get("/:labId/patients", getPatientsLab)
router.post("/:labId/patients/:patientLabId", finishPatientLab)
// END Patient Lab

// Start Treatments
router.get("/:labId/treatments", getTreatmentsLab)
router.post("/:labId/treatments", createTreatmentLab)
router.put("/:labId/treatments/:treatmentId", updateTreatmentLab)
router.delete("/:labId/treatments/:treatmentId", deleteTreatmentLab)
// END Treatments

// Start Payments
router.get("/:labId/payments", getPaymentsLab)
router.post("/:labId/payments", createPaymentLab)
router.put("/:labId/payments/:paymentId", updatePaymentLab)
router.delete("/:labId/payments/:paymentId", deletePaymentLab)
// END Payments


module.exports = router