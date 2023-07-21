const router = require("express").Router();
const { getPermissions,
  getPermissionsByTable,
  createPermission,
  createManyPermission,
  updatePermission,
  deletePermission ,
  deleteAllPermission
} = require("../controllers/PermissionController")

router.get("/", getPermissions)
router.get("/byTable", getPermissionsByTable)
router.post("/", createPermission)
router.post("/many", createManyPermission)
router.put("/:id", updatePermission)
router.delete("/:id", deletePermission)
router.delete("/", deleteAllPermission)

module.exports = router