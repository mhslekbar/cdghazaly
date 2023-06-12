const router = require("express").Router();

const { getAssurances, createAssurance, updateAssurance, deleteAssurance } = require("../controllers/Assurance/AssuranceController")
const { createInvoiceAssurance, deleteInvoiceAssurance } = require("../controllers/Assurance/InvoiceAssuranceController")

router.get("/", getAssurances)
router.post("/", createAssurance)
router.put("/:id", updateAssurance)
router.delete("/:id", deleteAssurance)

// START Invoices
router.post("/invoices/:AssId", createInvoiceAssurance)
router.delete("/invoices/:AssId/deleteInvoice/:invoiceId", deleteInvoiceAssurance)

// END Invoices

module.exports = router
