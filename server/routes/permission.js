const router = require("express").Router();
const { getPermissions,
  getPermissionsByTable,
  createPermission,
  updatePermission,
  deletePermission 
} = require("../controllers/PermissionController")

router.get("/", getPermissions)
router.get("/byTable", getPermissionsByTable)
router.post("/", createPermission)
router.put("/:id", updatePermission)
router.delete("/:id", deletePermission)

module.exports = router