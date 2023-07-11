const router = require("express").Router();
const { getPurchaseOrders, createPurchaseOrder, updatePurchaseOrder, deletePurchaseOrder } = require("../controllers/PurchaseOrderController")

router.get("/:doctor", getPurchaseOrders)
router.post("/:doctor", createPurchaseOrder)
router.put("/:doctor/:id", updatePurchaseOrder)
router.delete("/:doctor/:id", deletePurchaseOrder)

module.exports = router