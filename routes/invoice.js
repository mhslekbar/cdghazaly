const router = require("express").Router()
const { getInvoices, createInvoice, deleteInvoice } = require("../controllers/InvoiceController")

router.get("/:patient", getInvoices)
router.post("/:patient", createInvoice)
router.delete("/:patient/:id", deleteInvoice)

module.exports = router