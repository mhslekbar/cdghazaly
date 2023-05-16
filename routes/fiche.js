const router = require("express").Router()
const { getFiches, createFiche, updateFiche, deleteFiche, createLineFiche } = require("../controllers/FicheController");

router.get("/:patient", getFiches)
router.post("/:patient", createFiche)
router.post("/:patient/:ficheId", createLineFiche)
router.put("/:patient/:id", updateFiche)
router.delete("/:patient/:id", deleteFiche)

module.exports = router
