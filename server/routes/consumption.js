const router = require("express").Router()
const { 
  getConsumptions, createConsumption, updateConsumption, deleteConsumption
} = require("../controllers/ConsumptionController")

router.get("/", getConsumptions)
router.post("/", createConsumption)
router.put("/:id", updateConsumption)
router.delete("/:id", deleteConsumption)

module.exports = router
