const router = require("express").Router()
const { getPatients, createPatient, updatePatient, passPatient, finishPatient, returnPatient, deletePatient } = require("../controllers/PatientController")
const { authorizedPermission } = require("../middlewares/authorizedPermission");

router.get("/", authorizedPermission(["AFFICHER", "AFFICHER_LIST", "AFFICHER_GLOBAL"], "PATIENTS"), getPatients)
router.post("/", authorizedPermission(["AJOUTER"], "PATIENTS"), createPatient)
router.put("/:id", authorizedPermission(["MODIFIER"], "PATIENTS"), updatePatient)
router.delete("/:id", authorizedPermission(["SUPPRIMER"], "PATIENTS"), deletePatient)

router.post("/passPatient", authorizedPermission(["PASSER"], "PATIENTS"), passPatient)
router.post("/finishPatient", authorizedPermission(["TERMINER"], "PATIENTS"), finishPatient)
router.post("/returnPatient", authorizedPermission(["RETOURNER"], "PATIENTS"), returnPatient)

module.exports = router