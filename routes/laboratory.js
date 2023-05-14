const router = require("express").Router();
const { getLabortories, createLabortory, updateLabortory, deleteLabortory } = require("../controllers/LaboratoryController")

router.get("/", getLabortories)
router.post("/", createLabortory)
router.put("/:id", updateLabortory)
router.delete("/:id", deleteLabortory)

module.exports = router