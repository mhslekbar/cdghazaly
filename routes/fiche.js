const router = require("express").Router()
const { getFiches, createFiche, updateFiche, deleteFiche, updateLineFiche, deleteLineFiche } = require("../controllers/FicheController");

router.get("/:patient", getFiches)
router.post("/:patient", createFiche)
router.put("/:patient/:id", updateFiche)
router.delete("/:patient/:id", deleteFiche)

router.put("/:patient/LineFiche/:ficheId", updateLineFiche)
router.delete("/:patient/:ficheId/LineFiche/:lineFicheId", deleteLineFiche)

module.exports = router
