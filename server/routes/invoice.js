const router = require("express").Router()
const { getInvoices, getAllDevis, createInvoice, deleteInvoice } = require("../controllers/InvoiceController")
const { authorizedPermission } = require("../middlewares/authorizedPermission");

router.get("/", authorizedPermission(["AFFICHER"], "FACTURES_PATIENTS"), getInvoices)
router.get("/:patient", authorizedPermission(["AFFICHER"], "FACTURES_PATIENTS"), getInvoices)
router.get("/:patient/getAllDevis", authorizedPermission(["AFFICHER"], "FACTURES_PATIENTS"),  getAllDevis)
router.post("/:patient", authorizedPermission(["AJOUTER"], "FACTURES_PATIENTS"),  createInvoice)
router.delete("/:patient/:id", authorizedPermission(["SUPPRIMER"], "FACTURES_PATIENTS"),  deleteInvoice)

module.exports = router