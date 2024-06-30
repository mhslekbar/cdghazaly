const router = require("express").Router()
const { getImplants, finishImplant} = require("../controllers/ImplantTreatController")
const { authorizedPermission } = require("../middlewares/authorizedPermission");

router.get("/", authorizedPermission(["AFFICHER"], "IMPLANTS"), getImplants)
router.put("/:id", authorizedPermission(["TERMINER"], "IMPLANTS"), finishImplant)

module.exports = router