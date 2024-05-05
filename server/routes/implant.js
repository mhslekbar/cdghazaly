const router = require("express").Router()
const { getImplants} = require("../controllers/ImplantTreatController")
const { authorizedPermission } = require("../middlewares/authorizedPermission");

router.get("/", authorizedPermission(["AFFICHER"], "IMPLANTS"), getImplants)

module.exports = router