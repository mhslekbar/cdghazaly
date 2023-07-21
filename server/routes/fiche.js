const router = require("express").Router()
const { getFiches, createFiche, updateFiche, deleteFiche, updateLineFiche, deleteLineFiche } = require("../controllers/FicheController");
const { authorizedPermission } = require("../middlewares/authorizedPermission");

router.get("/:patient", authorizedPermission(["AFFICHER"], "FICHES"), getFiches)
router.post("/:patient", authorizedPermission(["AJOUTER"], "FICHES"), createFiche)
router.put("/:patient/:id", authorizedPermission(["MODIFIER"], "FICHES"), updateFiche)
router.delete("/:patient/:id", authorizedPermission(["SUPPRIMER"], "FICHES"), deleteFiche)

router.put("/:patient/LineFiche/:ficheId", authorizedPermission(["AJOUTER_LIGNE", "MODIFIER_LIGNE"], "FICHES"), updateLineFiche)
router.delete("/:patient/:ficheId/LineFiche/:lineFicheId", authorizedPermission(["SUPPRIMER_LIGNE"], "FICHES"), deleteLineFiche)

module.exports = router

