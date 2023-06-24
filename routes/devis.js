const router = require("express").Router()
const { getDevis, createDevis, appendToDevis, updateDevis, editLineDevis, deleteDevis, deleteLineDevis } = require("../controllers/DevisController")

router.get("/:patient", getDevis)
router.post("/:patient", createDevis)
router.post("/:patient/append/:id", appendToDevis)
router.put("/:patient/:id", updateDevis)
router.put("/:patient/:devisId/editLineDevis/:lineId", editLineDevis)
router.delete("/:patient/:id", deleteDevis)
router.delete("/:patient/:devisId/deleteLineDevis/:lineDevisId", deleteLineDevis)

module.exports = router
