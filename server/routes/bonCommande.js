const router = require("express").Router();
const { getBonCommandes, createBonCommande, updateBonCommande, deleteBonCommande } = require("../controllers/BonCommandeController")

router.get("/:doctor", getBonCommandes)
router.post("/:doctor", createBonCommande)
router.put("/:doctor/:id", updateBonCommande)
router.delete("/:doctor/:id", deleteBonCommande)

module.exports = router