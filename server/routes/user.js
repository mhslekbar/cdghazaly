const router = require("express").Router()
const { getUsers, createUser, updateUser, deleteUser } = require("../controllers/UserController");

router.get("/", getUsers)
router.get("/specificUser", getUsers)
router.post("/", createUser)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)

module.exports = router