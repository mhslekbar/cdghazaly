const SupplierModel = require("../models/SupplierModel")
const UserModel = require("../models/UserModel")
const PurchaseOrderModel = require("../models/PurchaseOrderModel")

const getSuppliers = async (req, res) => {
  try {
    const Suppliers = await SupplierModel
      .find()
      .populate("accounts.doctor")
      .populate("historyPayment.purchaseOrderId")
      .sort({ name: 1 })
    res.status(200).json({ success: Suppliers })
  } catch(err) {
    res.status(500).json({ err: err.message })
  }
}

const createSupplier = async (req, res) => {
  try {
    const { name, phone } = req.body
    const formErrors = []
    const checkSupplier = await SupplierModel.findOne({ name, phone })
    if(checkSupplier) {
      formErrors.push("Fournisseur Existe deja")
    }
    if(name.length === 0) {
      formErrors.push("Nom est obligatoire")
    }
    if(phone.length === 0) {
      formErrors.push("Telephone est obligatoire")
    }
    if(formErrors.length === 0) {
      const users = await UserModel.find()
      let doctors = users.filter(user => user.doctor.cabinet)
      let accounts = []
      doctors.map(doctor => {
        accounts.push({doctor, balance: 0})
      })
      console.log
      await SupplierModel.create({ name, phone, accounts })
      await getSuppliers(req, res)
    } else {
      res.status(300).json({ formErrors })
    }
  } catch(err) {
    res.status(500).json({ err: err.message })
  }
}

const updateSupplier = async (req, res) => {
  try {
    const { id } = req.params
    const supplierData = await SupplierModel.findOne({ _id: id })
    const { name, phone } = req.body
    const formErrors = []
    const checkSupplier = await SupplierModel.findOne({ _id: {$ne: id},  name, phone })
    if(checkSupplier) {
      formErrors.push("Fournisseur Existe deja")
    }
    if(name.length === 0) {
      name = supplierData.name
    }
    if(phone.length === 0) {
      phone = supplierData.phone
    }
    if(formErrors.length === 0) {
      await SupplierModel.updateOne({_id: id}, { name, phone }, { new: true })
      await getSuppliers(req, res)
    } else {
      res.status(300).json({ formErrors })
    }
  } catch(err) {
    res.status(500).json({ err: err.message })
  }
}

const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params
    const formErrors = []
    // start check Supplier has a purchase order
    const PurchaseOrderInfo = await PurchaseOrderModel.find({ supplier: id })
    if(PurchaseOrderInfo.length > 0) {
      formErrors.push("Supprimer tous les bons de commandes de ce fournisseur, pour pouvoir le supprimer.")
    }
    // end check Supplier has a purchase order
    if(formErrors.length === 0) {
      await SupplierModel.findByIdAndDelete(id)
      await getSuppliers(req, res)
    } else {
      res.status(300).json({ formErrors })
    }
  } catch(err) {
    res.status(500).json({ err: err.message })
  }
}

module.exports = { getSuppliers, createSupplier, updateSupplier, deleteSupplier }