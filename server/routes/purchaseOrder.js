const router = require("express").Router();
const {
  getPurchaseOrders, createPurchaseOrder, updatePurchaseOrder, setTotalPurchaseOrder, deletePurchaseOrder,
  createPayment, updatePayment, deletePayment
} = require("../controllers/PurchaseOrderController")
const { authorizedPermission } = require("../middlewares/authorizedPermission");

router.get("/:doctor", authorizedPermission(["AFFICHER", "AFFICHER_LIST"], "LIST_CONSOMMABLE"), getPurchaseOrders)
router.post("/:doctor", authorizedPermission(["AJOUTER"], "LIST_CONSOMMABLE"), createPurchaseOrder)
router.put("/:doctor/:id", authorizedPermission(["MODIFIER"], "LIST_CONSOMMABLE"), updatePurchaseOrder)
router.put("/:doctor/:id/setTotal", authorizedPermission(["MODIFIER"], "LIST_CONSOMMABLE"), setTotalPurchaseOrder)
router.delete("/:doctor/:id", authorizedPermission(["SUPPRIMER"], "LIST_CONSOMMABLE"), deletePurchaseOrder)

router.post("/:doctor/:id/payment", createPayment)
router.put("/:doctor/:id/payment/:paymentId", updatePayment)
router.delete("/:doctor/:id/payment/:paymentId", deletePayment)

module.exports = router
