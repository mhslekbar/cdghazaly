const router = require("express").Router();
const {
  getSuppliers, createSupplier,
  updateSupplier, deleteSupplier 
} = require("../controllers/SupplierControler")

router.get("/", getSuppliers)
router.post("/", createSupplier)
router.put("/:id", updateSupplier)
router.delete("/:id", deleteSupplier)

module.exports = router