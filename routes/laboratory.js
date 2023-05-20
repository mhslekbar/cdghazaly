const router = require("express").Router();
const { 
  getLabortories, createLabortory, updateLabortory, deleteLabortory, getPatientsLab,
  getAccountsLab, getConsumptionsLab
 } = require("../controllers/Laboratory/LaboratoryController")

 const { 
  getTreatmentsLab, createTreatmentLab, updateTreatmentLab, deleteTreatmentLab 
 } = require("../controllers/Laboratory/TreatmentLabController")
 const { 
  getPaymentsLab, createPaymentLab, updatePaymentLab, deletePaymentLab
} = require("../controllers/Laboratory/PaymentLabController")

router.get("/", getLabortories)
router.get("/:labId/accounts", getAccountsLab)
router.get("/:labId/consumptions", getConsumptionsLab)
router.get("/:labId/patients", getPatientsLab)
router.post("/", createLabortory)
router.put("/:id", updateLabortory)
router.delete("/:id", deleteLabortory)

router.get("/:labId/treatments", getTreatmentsLab)
router.post("/:labId/treatments", createTreatmentLab)
router.put("/:labId/treatments/:treatmentId", updateTreatmentLab)
router.delete("/:labId/treatments/:treatmentId", deleteTreatmentLab)

router.get("/:labId/payments", getPaymentsLab)
router.post("/:labId/payments", createPaymentLab)
router.put("/:labId/payments/:paymentId", updatePaymentLab)
router.delete("/:labId/payments/:paymentId", deletePaymentLab)


module.exports = router