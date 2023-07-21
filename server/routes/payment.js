const router = require("express").Router()
const { getPayments, createPayment, updatePayment, deletePayment } = require("../controllers/PaymentController")
const { authorizedPermission } = require("../middlewares/authorizedPermission");

router.get("/", authorizedPermission(["AFFICHER"], "PAIEMENTS_PATIENTS"), getPayments)
router.post("/", authorizedPermission(["AJOUTER"], "PAIEMENTS_PATIENTS"), createPayment)
router.put("/:id", authorizedPermission(["MODIFIER"], "PAIEMENTS_PATIENTS"), updatePayment)
router.delete("/:id", authorizedPermission(["SUPPRIMER"], "PAIEMENTS_PATIENTS"), deletePayment)

module.exports = router
