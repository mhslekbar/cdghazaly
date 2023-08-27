const router = require("express").Router();
const { getSuppliers, createSupplier, updateSupplier, deleteSupplier  } = require("../controllers/SupplierControler")
const { authorizedPermission } = require("../middlewares/authorizedPermission");

router.get("/", authorizedPermission(["AFFICHER", "AFFICHER_LIST"], "FOURNISSEURS"), getSuppliers)
router.post("/", authorizedPermission(["AJOUTER"], "FOURNISSEURS"), createSupplier)
router.put("/:id", authorizedPermission(["MODIFIER"], "FOURNISSEURS"), updateSupplier)
router.delete("/:id", authorizedPermission(["SUPPRIMER"], "FOURNISSEURS"), deleteSupplier)

module.exports = router