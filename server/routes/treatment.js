const router = require("express").Router();
const { 
  getTreatments,
  createTreatment,
  updateTreatment,
  deleteTreatment 
} = require("../controllers/TreatmentController");

router.get("/", getTreatments)
router.get("/searchTreat", getTreatments)
router.post("/", createTreatment)
router.put("/:id", updateTreatment)
router.delete("/:id", deleteTreatment)

module.exports = router
