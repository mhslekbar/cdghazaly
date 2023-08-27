import React, { useState } from 'react'
import { InputElement } from '../../../../../HtmlComponents/InputElement'
import { FaCheck } from 'react-icons/fa'
import { formattedDate, hideMsg } from '../../../../../functions/functions'
import { useDispatch } from 'react-redux'
import { AddPaymentPurchaseOrderApi } from '../../../../../redux/purchaseOrder/purchaseOrderApiCalls'
import { useParams } from 'react-router'
import { ShowSuppliersApi } from '../../../../../redux/suppliers/supplierApiCalls'
import { PurchaseOrderInterface } from '../../types'

interface AddPaymentInterface {
  purchaseOrder: PurchaseOrderInterface
}

const AddPayment:React.FC<AddPaymentInterface> = ({ purchaseOrder }) => {
  const [payment, setPayment] = useState("")
  const [createdAt, setCreatedAt] = useState(formattedDate(new Date().toDateString()))
  const dispatch: any = useDispatch()
  const { doctorId } = useParams()
  const [errors, setErrors] = useState<string[]>([])
  const [success, setSuccess] = useState<string[]>([])
  const [showMsg, setShowMsg] = useState(false)

  const handleAddPayment = async () => {
    try {
      const response = await dispatch(AddPaymentPurchaseOrderApi(doctorId, purchaseOrder._id, {payment, createdAt, supplier: purchaseOrder.supplier._id}))
      if(response === true) {
        setPayment("")
        setCreatedAt(formattedDate(new Date().toDateString()))
        setErrors([])
        setSuccess(["Ajouter avec success"])
        await dispatch(ShowSuppliersApi())
        setShowMsg(true)
        setTimeout(() => setShowMsg(false), 1000)
      } else {
        setErrors(response)
        setSuccess([])
        setShowMsg(true)
        setTimeout(() => setShowMsg(false), 1000)
      }
    } catch {}
  }

  return (
    <>
    <div className='flex justify-start items-center gap-2'>
      <InputElement type='number' id="Montant" placeholder='Montant' value={payment} setValue={setPayment} />
      <InputElement type='date' value={createdAt} setValue={setCreatedAt} />
      <FaCheck className='text-main' style={{ fontSize: "22px" }} onClick={handleAddPayment} />
    </div>
    {showMsg && errors.length > 0 &&
      errors.map((err, index) => (
        <p
          className="p-3 my-2 rounded bg-red text-white msg"
          key={index}
          onClick={(e) => hideMsg(e, errors, setErrors)}
        >
          {err}
        </p>
    ))}
    {showMsg && success.length > 0 &&
      success.map((err, index) => (
        <p
          className="p-2 rounded bg-blue text-white msg"
          key={index}
          onClick={(e) => hideMsg(e, success, setSuccess)}
        >
          {err}
        </p>
    ))}
    </>
  )
}

export default AddPayment
