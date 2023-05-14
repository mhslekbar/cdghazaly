const router = require("express").Router();
const { getRoles, insertRole, updateRole, deleteRole } = require("../controllers/RoleController")

router.get("/", getRoles)
router.post("/", insertRole)
router.put("/:id", updateRole)
router.delete("/:id", deleteRole)

module.exports = router
