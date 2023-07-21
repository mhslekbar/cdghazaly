const router = require("express").Router()
const { getDevis, createDevis, appendToDevis, updateDevis, editLineDevis, deleteDevis, deleteLineDevis } = require("../controllers/DevisController")
const { authorizedPermission } = require("../middlewares/authorizedPermission");

router.get("/:patient", authorizedPermission(["AFFICHER"], "DEVIS"), getDevis)
router.post("/:patient", authorizedPermission(["AJOUTER"], "DEVIS"), createDevis)
router.post("/:patient/append/:id", authorizedPermission(["MODIFIER"], "DEVIS"), appendToDevis)
router.put("/:patient/:id", authorizedPermission(["MODIFIER"], "DEVIS"), updateDevis)
router.put("/:patient/:devisId/editLineDevis/:lineId", authorizedPermission(["MODIFIER"], "DEVIS"), editLineDevis)
router.delete("/:patient/:id", authorizedPermission(["SUPPRIMER"], "DEVIS"), deleteDevis)
router.delete("/:patient/:devisId/deleteLineDevis/:lineDevisId", authorizedPermission(["SUPPRIMER"], "DEVIS"), deleteLineDevis)

module.exports = router
