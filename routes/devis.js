const router = require("express").Router()
const { getDevis, createDevis, appendToDevis, updateDevis, deleteDevis, deleteLineDevis } = require("../controllers/DevisController")

router.get("/:patient", getDevis)
router.post("/:patient", createDevis)
router.post("/:patient/:id", appendToDevis)
router.put("/:patient/:id", updateDevis)
router.delete("/:patient/:id", deleteDevis)
router.delete("/:patient/:id/LineDevis/:lineDevisId", deleteLineDevis)

module.exports = router
