const router = require("express").Router()
const { getPaymentMethods, createPaymentMethod, updatePaymentMethod, deletePaymentMethod } = require("../controllers/PaymentMethodController")

router.get("/", getPaymentMethods)
router.post("/", createPaymentMethod)
router.put("/:id", updatePaymentMethod)
router.delete("/:id", deletePaymentMethod)

module.exports = router
