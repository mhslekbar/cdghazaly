const router = require("express").Router()
const { getPayments, createPayment, updatePayment, deletePayment } = require("../controllers/PaymentController")

router.get("/", getPayments)
router.post("/", createPayment)
router.put("/:id", updatePayment)
router.delete("/:id", deletePayment)

module.exports = router
