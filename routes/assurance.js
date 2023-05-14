const router = require("express").Router();
const { getAssurances, createAssurance, updateAssurance, deleteAssurance } = require("../controllers/AssuranceController")

router.get("/", getAssurances)
router.post("/", createAssurance)
router.put("/:id", updateAssurance)
router.delete("/:id", deleteAssurance)

module.exports = router
