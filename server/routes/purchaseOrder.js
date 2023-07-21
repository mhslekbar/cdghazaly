const router = require("express").Router();
const { getPurchaseOrders, createPurchaseOrder, updatePurchaseOrder, deletePurchaseOrder } = require("../controllers/PurchaseOrderController")
const { authorizedPermission } = require("../middlewares/authorizedPermission");

router.get("/:doctor", authorizedPermission(["AFFICHER", "AFFICHER_LIST"], "LIST_CONSOMMABLE"), getPurchaseOrders)
router.post("/:doctor", authorizedPermission(["AJOUTER"], "LIST_CONSOMMABLE"), createPurchaseOrder)
router.put("/:doctor/:id", authorizedPermission(["MODIFIER"], "LIST_CONSOMMABLE"), updatePurchaseOrder)
router.delete("/:doctor/:id", authorizedPermission(["SUPPRIMER"], "LIST_CONSOMMABLE"), deletePurchaseOrder)

module.exports = router