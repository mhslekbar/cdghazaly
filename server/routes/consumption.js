const router = require("express").Router()
const { 
  getConsumptions, createConsumption, updateConsumption, deleteConsumption
} = require("../controllers/ConsumptionController")
const { authorizedPermission } = require("../middlewares/authorizedPermission");

router.get("/", authorizedPermission(["AFFICHER"], "CONSOMMATIONS"), getConsumptions)
router.post("/", authorizedPermission(["AJOUTER"], "CONSOMMATIONS"), createConsumption)
router.put("/:id", authorizedPermission(["MODIFIER"], "CONSOMMATIONS"), updateConsumption)
router.delete("/:id", authorizedPermission(["SUPPRIMER"], "CONSOMMATIONS"), deleteConsumption)

module.exports = router
