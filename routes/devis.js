const router = require("express").Router()
const { getDevis, createDevis, updateDevis, deleteDevis } = require("../controllers/DevisController")

router.get("/", getDevis)
router.post("/", createDevis)
router.put("/:id", updateDevis)
router.delete("/:id", deleteDevis)

module.exports = router
