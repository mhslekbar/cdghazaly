const router = require("express").Router()
const { getPrescription, createPrescription, updatePrescription, deletePrescription } = require("../controllers/PrescriptionController")
const { authorizedPermission } = require("../middlewares/authorizedPermission");

router.get("/", authorizedPermission(["AFFICHER", "AFFICHER_LIST"], "ORDONNANCES"), getPrescription)
router.post("/", authorizedPermission(["AJOUTER"], "ORDONNANCES"), createPrescription)
router.put("/:id", authorizedPermission(["MODIFIER"], "ORDONNANCES"), updatePrescription)
router.delete("/:id", authorizedPermission(["SUPPRIMER"], "ORDONNANCES"), deletePrescription)

module.exports = router