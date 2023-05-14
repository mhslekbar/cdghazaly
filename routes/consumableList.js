const router = require("express").Router()
const { getConsumableList, createConsumableList, updateConsumableList, deleteConsumableList } = require("../controllers/ConsumableListConstroller")

router.get("/", getConsumableList)
router.post("/", createConsumableList)
router.put("/:id", updateConsumableList)
router.delete("/:id", deleteConsumableList)

module.exports = router