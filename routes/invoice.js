const router = require("express").Router()
const { getInvoices, getAllDevis, createInvoice, deleteInvoice } = require("../controllers/InvoiceController")

router.get("/:patient", getInvoices)
router.get("/:patient/getAllDevis", getAllDevis)
router.post("/:patient", createInvoice)
router.delete("/:patient/:id", deleteInvoice)

module.exports = router