const router = require("express").Router();

const { getAssurances, createAssurance, updateAssurance, deleteAssurance } = require("../controllers/Assurance/AssuranceController")
const { createInvoiceAssurance, payInvoiceAssurance, deleteInvoiceAssurance } = require("../controllers/Assurance/InvoiceAssuranceController")
const { authorizedPermission } = require("../middlewares/authorizedPermission");

router.get("/", authorizedPermission(["AFFICHER"], "ASSURANCES"), getAssurances)
router.post("/", authorizedPermission(["AJOUTER"], "ASSURANCES"), createAssurance)
router.put("/:id", authorizedPermission(["MODIFIER"], "ASSURANCES"), updateAssurance)
router.delete("/:id", authorizedPermission(["SUPPRIMER"], "ASSURANCES"), deleteAssurance)

// START Invoices
router.post("/invoices/:AssId", authorizedPermission(["AJOUTER_FACTURE"], "PATIENTS_ASSURANCE"), createInvoiceAssurance)
router.delete("/invoices/:AssId/payInvoice/:invoiceId", authorizedPermission(["PAYER_FACTURE"], "PATIENTS_ASSURANCE"), payInvoiceAssurance)
router.delete("/invoices/:AssId/deleteInvoice/:invoiceId", authorizedPermission(["SUPPRIMER_FACTURE"], "PATIENTS_ASSURANCE"), deleteInvoiceAssurance)
// END Invoices

module.exports = router
