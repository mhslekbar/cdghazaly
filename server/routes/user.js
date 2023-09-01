const router = require("express").Router()
const { getUsers, createUser, updateUser, deleteUser } = require("../controllers/UserController");
const { authorizedPermission } = require("../middlewares/authorizedPermission");

router.get("/", authorizedPermission(["AFFICHER", "AFFICHER_LIST"], "UTILISATEURS"), getUsers)
router.get("/specificUser", authorizedPermission(["AFFICHER", "AFFICHER_LIST"], "UTILISATEURS"), getUsers)
router.post("/", authorizedPermission(["AJOUTER"], "UTILISATEURS"), createUser)
router.put("/:id", authorizedPermission(["MODIFIER"], "UTILISATEURS"), updateUser)
router.delete("/:id", authorizedPermission(["SUPPRIMER"], "UTILISATEURS"), deleteUser)

module.exports = router
