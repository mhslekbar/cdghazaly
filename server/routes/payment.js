const router = require("express").Router()
const { getPayments, createPayment, updatePayment, deletePayment, approvePayments } = require("../controllers/PaymentController")
const { authorizedPermission } = require("../middlewares/authorizedPermission");

router.get("/", authorizedPermission(["AFFICHER"], "PAIEMENTS_PATIENTS"), getPayments)
router.get("/patient", authorizedPermission(["AFFICHER"], "PAIEMENTS_PATIENTS"), getPayments)
router.post("/", authorizedPermission(["AJOUTER"], "PAIEMENTS_PATIENTS"), createPayment)
router.put("/:id", authorizedPermission(["MODIFIER"], "PAIEMENTS_PATIENTS"), updatePayment)
router.delete("/:id", authorizedPermission(["SUPPRIMER"], "PAIEMENTS_PATIENTS"), deletePayment)
router.put("/approve/:doctorId", authorizedPermission(["APPROUVER"], "PAIEMENTS_PATIENTS"), approvePayments)

module.exports = router
