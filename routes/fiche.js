const router = require("express").Router()
const { getFiches, createFiche, updateFiche, deleteFiche } = require("../controllers/FicheController");

router.get("/:patient", getFiches)
router.post("/:patient", createFiche)
router.put("/:patient/:id", updateFiche)
router.delete("/:patient/:id", deleteFiche)

module.exports = router
