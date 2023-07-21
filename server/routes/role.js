const router = require("express").Router();
const { getRoles, insertRole, updateRole, deleteRole } = require("../controllers/RoleController")
const { authorizedPermission } = require("../middlewares/authorizedPermission");

router.get("/", authorizedPermission(["AFFICHER", "AFFICHER_LIST"], "ROLES"), getRoles)
router.post("/", authorizedPermission(["AJOUTER"], "ROLES"), insertRole)
router.put("/:id", authorizedPermission(["MODIFIER"], "ROLES"), updateRole)
router.delete("/:id", authorizedPermission(["SUPPRIMER"], "ROLES"), deleteRole)

module.exports = router
