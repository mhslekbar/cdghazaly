const router = require("express").Router()
const { getPayments, createPayment, updatePayment, getAllPayments, deletePayment } = require("../controllers/PaymentController")

router.get("/", getPayments)
router.get("/all_payments", getAllPayments)
router.post("/", createPayment)
router.put("/:id", updatePayment)
router.delete("/:id", deletePayment)

module.exports = router
