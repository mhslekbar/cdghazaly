const PurchaseOrderModel = require("../models/PurchaseOrderModel")
const SupplierModel = require("../models/SupplierModel")

const getPurchaseOrders = async (request, response) => {
  try {
    const { doctor } = request.params
    const PurchaseOrder = await PurchaseOrderModel
    .find({ doctor })
    .populate("doctor")
    .populate("supplier")
    .populate("LinePurchaseOrder.consumable")
    .sort({ createdAt: -1 })
    response.status(200).json({ success: PurchaseOrder })
  } catch(error) {
    response.status(500).json({ error: error.message })
  }
}

const createPurchaseOrder = async (request, response) => {
  try {
    const { doctor } = request.params
    const { supplier, LinePurchaseOrder } = request.body
    const currentDate =  new Date()
    const latestPurchaseOrder = await PurchaseOrderModel
    .findOne({ doctor, })
    .sort({ createdAt: -1 })
    let num = 1
    if(latestPurchaseOrder) {
      if(latestPurchaseOrder.createdAt.getMonth() === currentDate.getMonth() && latestPurchaseOrder.createdAt.getFullYear() === currentDate.getFullYear()) {
        num = latestPurchaseOrder?.num || 0
        num++
      } else {
        num = 1
      }
    }
    const formErrors = []
    if(supplier.length === 0) {
      formErrors.push("Le fournisseurs est obligatoire")
    }
    if(formErrors.length === 0) {
      await PurchaseOrderModel.create({ doctor, supplier, num, LinePurchaseOrder })
      await getPurchaseOrders(request, response)
    } else {
      response.status(300).json({ formErrors })
    }
  } catch (error) {
    response.status(500).json({ error: error.message })
  }
}

const updatePurchaseOrder = async (request, response) => {
  try {
    const { id } = request.params
    const { supplier, LinePurchaseOrder } = request.body
    const formErrors = []
    const pushaseOrderData = await PurchaseOrderModel.findOne({ _id: id })
    if(LinePurchaseOrder.length === 0) {
      formErrors.push("Le donneés du bon de commande sont obligatoire.")
    }
    if(supplier.length === 0) {
      formErrors.push("Le fournisseurs est obligatoire")
    }
    if(formErrors.length === 0) {
      // START prev supplier =>  here i will set the data to default because supplier can be not like previous
      const prevTotal = pushaseOrderData.total ?? 0
      if(pushaseOrderData.supplier) {
        let prevSupplierData = await SupplierModel.findOne({ _id: pushaseOrderData.supplier, "accounts.doctor": pushaseOrderData.doctor })
        let prevBalanceSupplier = prevSupplierData.accounts?.find(c => c.doctor?.equals(pushaseOrderData.doctor)).balance ?? 0
        if(prevSupplierData.accounts) {
          prevSupplierData.accounts.find(c => c.doctor?.equals(pushaseOrderData.doctor)).balance = Number(prevBalanceSupplier) + Number(prevTotal)
        }
        await prevSupplierData.save()
      }
      // END prev supplier

      // START NEW supplier
      const newSupplierData = await SupplierModel.findOne({ _id: supplier, "accounts.doctor": pushaseOrderData.doctor })
      let newBalanceSupplier = newSupplierData.accounts?.find(c => c.doctor?.equals(pushaseOrderData.doctor)).balance ?? 0
      if(newSupplierData.accounts) {
        const prevNewBalanceSupplier = Number(newBalanceSupplier) - Number(prevTotal)
        newSupplierData.accounts.find(c => c.doctor?.equals(pushaseOrderData.doctor)).balance = Number(prevNewBalanceSupplier)
      }
      await newSupplierData.save()
      // END NEW supplier
      await PurchaseOrderModel.updateOne({ _id: id }, { supplier, LinePurchaseOrder }, { new: true })
      await getPurchaseOrders(request, response)
    } else {
      response.status(300).json({ formErrors })
    }
  } catch (error) {
    response.status(500).json({ error: error.message })
  }
}

const setTotalPurchaseOrder = async (request, response) => {
  try {
    const { id } = request.params
    const { total } = request.body

    const pushaseOrderData = await PurchaseOrderModel.findOne({ _id: id })
    const { supplier } = pushaseOrderData
    // START prev supplier =>  here i will set the data to default because supplier can be not like previous
    if(pushaseOrderData.supplier) {
      const prevTotal = pushaseOrderData.total ?? 0
      let prevSupplierData = await SupplierModel.findOne({ _id: pushaseOrderData.supplier, "accounts.doctor": pushaseOrderData.doctor })
      let prevBalanceSupplier = prevSupplierData.accounts?.find(c => c.doctor?.equals(pushaseOrderData.doctor)).balance ?? 0
      if(prevSupplierData.accounts) {
        prevSupplierData.accounts.find(c => c.doctor?.equals(pushaseOrderData.doctor)).balance = Number(prevBalanceSupplier) + Number(prevTotal)
      }
      await prevSupplierData.save()
    }
    // END prev supplier

    // START NEW supplier
    const newSupplierData = await SupplierModel.findOne({ _id: supplier, "accounts.doctor": pushaseOrderData.doctor })
    let newBalanceSupplier = newSupplierData.accounts?.find(c => c.doctor?.equals(pushaseOrderData.doctor)).balance ?? 0
    if(newSupplierData.accounts) {
      const prevNewBalanceSupplier = Number(newBalanceSupplier) - Number(total)
      newSupplierData.accounts.find(c => c.doctor?.equals(pushaseOrderData.doctor)).balance = Number(prevNewBalanceSupplier)
    }
    await newSupplierData.save()
    // END NEW supplier
    await PurchaseOrderModel.updateOne({ _id: id }, { total, paymentDate: new Date() }, { new: true })
    await getPurchaseOrders(request, response)
  } catch(error) {
    response.status(500).json({ error: error.message })
  }
}

const deletePurchaseOrder = async (request, response) => {
  try {
    const { id } = request.params
    const pushaseOrderData = await PurchaseOrderModel.findOne({ _id: id })

    // START prev supplier =>  here i will set the data to default because supplier can be not like previous
    if(pushaseOrderData.supplier) {
      const prevTotal = pushaseOrderData.total ?? 0
      let prevSupplierData = await SupplierModel.findOne({ _id: pushaseOrderData.supplier, "accounts.doctor": pushaseOrderData.doctor })
      let prevBalanceSupplier = prevSupplierData.accounts?.find(c => c.doctor?.equals(pushaseOrderData.doctor)).balance ?? 0
      if(prevSupplierData.accounts) {
        prevSupplierData.accounts.find(c => c.doctor?.equals(pushaseOrderData.doctor)).balance = Number(prevBalanceSupplier) + Number(prevTotal)
      }
      await prevSupplierData.save()
    }
    // END prev supplier
    await PurchaseOrderModel.deleteOne({ _id: id})
    await getPurchaseOrders(request, response)
  } catch(error) {
    response.status(500).json({ error: error.message })
  }
}

const createPayment = async (request, response) => {
  try {
    const { id, doctor } = request.params
    const { payment, createdAt, supplier } = request.body
    const formErrors = []
    const SupplierData =  await SupplierModel.findOne({ _id: supplier })

    if(payment.length === 0) {
      formErrors.push("Le montant est obligatoire")
    }  
    if(createdAt.length === 0) {
      formErrors.push("Donner une date valide")
    }  

    if(formErrors.length === 0) {
      const prevBalanceSupplier = SupplierData.accounts.find(acc => acc.doctor.equals(doctor)).balance
      const newBalanceSupplier = Number(prevBalanceSupplier) + Number(payment)
      SupplierData.accounts.find(acc => acc.doctor.equals(doctor)).balance = newBalanceSupplier
      SupplierData.historyPayment.push({ payment, purchaseOrderId: id, createdAt })
      await SupplierData.save()
      await getPurchaseOrders(request, response)
    } else {
      response.status(300).json({ formErrors })
    }

  } catch (error) {
    response.status(500).json({ error: error.message })
  }
}

const updatePayment = async (request, response) => {
  try {
    const { id, doctor, paymentId } = request.params
    const { payment, createdAt, supplier } = request.body
    const formErrors = []
    const SupplierData =  await SupplierModel.findOne({ _id: supplier })

    if(payment.length === 0) {
      formErrors.push("Le montant est obligatoire")
    }  
    if(createdAt.length === 0) {
      formErrors.push("Donner une date valide")
    }  

    if(formErrors.length === 0) {
      const findIndexPayment = SupplierData.historyPayment.findIndex(hp => hp._id.equals(paymentId))
      const prevPayment = SupplierData.historyPayment[findIndexPayment].payment ?? 0
      const prevBalanceSupplier = SupplierData.accounts.find(acc => acc.doctor.equals(doctor)).balance
      const newBalanceSupplier = Number(prevBalanceSupplier) - Number(prevPayment) + Number(payment)

      SupplierData.accounts.find(acc => acc.doctor.equals(doctor)).balance = newBalanceSupplier
      
      SupplierData.historyPayment[findIndexPayment].payment = payment
      SupplierData.historyPayment[findIndexPayment].createdAt = createdAt

      await SupplierData.save()
      await getPurchaseOrders(request, response)
    } else {
      response.status(300).json({ formErrors })
    }
  } catch (error) {
    response.status(500).json({ error: error.message })
  }
}

const deletePayment = async (request, response) => {
  try {
    const { id, doctor, paymentId } = request.params
    const pushaseOrderData = await PurchaseOrderModel.findOne({ _id: id })
    const { supplier } = pushaseOrderData
    const formErrors = []
    const SupplierData =  await SupplierModel.findOne({ _id: supplier })

    if(formErrors.length === 0) {
      const findIndexPayment = SupplierData.historyPayment.findIndex(hp => hp._id.equals(paymentId))
      const prevPayment = SupplierData.historyPayment[findIndexPayment].payment ?? 0
      const prevBalanceSupplier = SupplierData.accounts.find(acc => acc.doctor.equals(doctor)).balance
      const newBalanceSupplier = Number(prevBalanceSupplier) - Number(prevPayment)
      
      SupplierData.accounts.find(acc => acc.doctor.equals(doctor)).balance = newBalanceSupplier
      SupplierData.historyPayment = SupplierData.historyPayment.filter(hp => !hp._id.equals(paymentId))
      await SupplierData.save()
      await getPurchaseOrders(request, response)
    } else {
      response.status(300).json({ formErrors })
    }
  } catch (error) {
    response.status(500).json({ error: error.message })
  }
}

module.exports = { 
  getPurchaseOrders, createPurchaseOrder, updatePurchaseOrder, deletePurchaseOrder, 
  createPayment, updatePayment, deletePayment, setTotalPurchaseOrder
}

