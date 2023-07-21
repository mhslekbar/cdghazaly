const router = require("express").Router();
const { 
  getTreatments,
  createTreatment,
  updateTreatment,
  deleteTreatment 
} = require("../controllers/TreatmentController");
const { authorizedPermission } = require("../middlewares/authorizedPermission");

router.get("/", authorizedPermission(["AFFICHER", "AFFICHER_LIST"], "TRAITEMENTS"), getTreatments)
router.get("/searchTreat", authorizedPermission(["AFFICHER", "AFFICHER_LIST"], "TRAITEMENTS"), getTreatments)
router.post("/", authorizedPermission(["AJOUTER"], "TRAITEMENTS"), createTreatment)
router.put("/:id", authorizedPermission(["MODIFIER"], "TRAITEMENTS"), updateTreatment)
router.delete("/:id", authorizedPermission(["SUPPRIMER"], "TRAITEMENTS"), deleteTreatment)

module.exports = router
