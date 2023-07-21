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

const { authorizedPermission } = require("../middlewares/authorizedPermission");

router.get("/", authorizedPermission(["AFFICHER", "AFFICHER_LIST"], "LABORATOIRES"),  getLabortories)
router.post("/", authorizedPermission(["AJOUTER"], "LABORATOIRES"),  createLabortory)
router.put("/:id", authorizedPermission(["MODIFIER"], "LABORATOIRES"),  updateLabortory)
router.delete("/:id", authorizedPermission(["SUPPRIMER"], "LABORATOIRES"),  deleteLabortory)

router.post("/consumptions", authorizedPermission(["AFFICHER", "AFFICHER_GLOBAL"], "CONSOMMATIONS_LABORATOIRE"),  getConsumptionsLab)

router.get("/:labId/accounts", authorizedPermission(["AFFICHER", "AFFICHER_GLOBAL"], "COMPTES_LABORATOIRE"),  getAccountsLab)

// Start Patient Lab
router.get("/:labId/patients", authorizedPermission(["AFFICHER", "AFFICHER_GLOBAL"], "PATIENTS_LABORATOIRE"),  getPatientsLab)
router.post("/:labId/patients/:patientLabId", authorizedPermission(["TERMINER"], "PATIENTS_LABORATOIRE"),  finishPatientLab)
// END Patient Lab

// Start Treatments
router.get("/:labId/treatments", authorizedPermission(["AFFICHER"], "TRAITEMENTS_LABORATOIRES"),  getTreatmentsLab)
router.post("/:labId/treatments", authorizedPermission(["AJOUTER"], "TRAITEMENTS_LABORATOIRES"),  createTreatmentLab)
router.put("/:labId/treatments/:treatmentId", authorizedPermission(["MODIFIER"], "TRAITEMENTS_LABORATOIRES"),  updateTreatmentLab)
router.delete("/:labId/treatments/:treatmentId", authorizedPermission(["SUPPRIMER"], "TRAITEMENTS_LABORATOIRES"),  deleteTreatmentLab)
// END Treatments

// Start Payments
router.get("/:labId/payments", authorizedPermission(["AFFICHER", "AFFICHER_GLOBAL"], "PAIEMENTS_LABORATOIRES"),  getPaymentsLab)
router.post("/:labId/payments", authorizedPermission(["AJOUTER"], "PAIEMENTS_LABORATOIRES"),  createPaymentLab)
router.put("/:labId/payments/:paymentId", authorizedPermission(["MODIFIER"], "PAIEMENTS_LABORATOIRES"),  updatePaymentLab)
router.delete("/:labId/payments/:paymentId", authorizedPermission(["SUPPRIMER"], "PAIEMENTS_LABORATOIRES"),  deletePaymentLab)
// END Payments


module.exports = router