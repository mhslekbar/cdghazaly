const router = require("express").Router()
const { getConsumableList, createConsumableList, updateConsumableList, deleteConsumableList } = require("../controllers/ConsumableListConstroller")
const { authorizedPermission } = require("../middlewares/authorizedPermission");

router.get("/", authorizedPermission(["AFFICHER", "AFFICHER_LIST"], "LIST_CONSOMMABLE"), getConsumableList)
router.post("/", authorizedPermission(["AJOUTER"], "LIST_CONSOMMABLE"), createConsumableList)
router.put("/:id", authorizedPermission(["MODIFIER"], "LIST_CONSOMMABLE"), updateConsumableList)
router.delete("/:id", authorizedPermission(["SUPPRIMER"], "LIST_CONSOMMABLE"), deleteConsumableList)

module.exports = router