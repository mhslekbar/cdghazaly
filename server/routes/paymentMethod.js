const router = require("express").Router()
const { getPaymentMethods, createPaymentMethod, updatePaymentMethod, deletePaymentMethod } = require("../controllers/PaymentMethodController")
const { authorizedPermission } = require("../middlewares/authorizedPermission");

router.get("/", authorizedPermission(["AFFICHER", "AFFICHER_LIST"], "METHOD_PAIEMENT"), getPaymentMethods)
router.post("/", authorizedPermission(["AJOUTER"], "METHOD_PAIEMENT"), createPaymentMethod)
router.put("/:id", authorizedPermission(["MODIFIER"], "METHOD_PAIEMENT"), updatePaymentMethod)
router.delete("/:id", authorizedPermission(["SUPPRIMER"], "METHOD_PAIEMENT"), deletePaymentMethod)

module.exports = router
