const router = require("express").Router()
const { getPaymentModes, createPaymentMode, updatePaymentMode, deletePaymentMode } = require("../controllers/PaymentModeController")
const { authorizedPermission } = require("../middlewares/authorizedPermission");

router.get("/", authorizedPermission(["AFFICHER", "AFFICHER_LIST"], "MODE_PAIEMENT"), getPaymentModes)
router.post("/", authorizedPermission(["AJOUTER"], "MODE_PAIEMENT"), createPaymentMode)
router.put("/:id", authorizedPermission(["MODIFIER"], "MODE_PAIEMENT"), updatePaymentMode)
router.delete("/:id", authorizedPermission(["SUPPRIMER"], "MODE_PAIEMENT"), deletePaymentMode)

module.exports = router
