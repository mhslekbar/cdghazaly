import React, { useState } from 'react'
import { InputElement } from '../../../../../HtmlComponents/InputElement'
import { FaCheck } from 'react-icons/fa'
import { formattedDate } from '../../../../../functions/functions'
import { useDispatch } from 'react-redux'
import { AddPaymentPurchaseOrderApi } from '../../../../../redux/purchaseOrder/purchaseOrderApiCalls'
import { useParams } from 'react-router'
import { ShowSuppliersApi } from '../../../../../redux/suppliers/supplierApiCalls'
import { PurchaseOrderInterface } from '../../types'
import ShowErrorMsg from '../../../../../HtmlComponents/ShowErrorMsg'
import { useTranslation } from 'react-i18next'

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

  const [loading, setLoading] = useState(false)

  const handleAddPayment = async () => {
    setLoading(true)
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
    } finally {
      setLoading(false)
    }
  }
  const { t } = useTranslation()
  return (
    <>
    <div className='flex justify-start items-center gap-2'>
      <InputElement type='number' id="Montant" placeholder={t('Montant')} value={payment} setValue={setPayment} />
      <InputElement type='date' value={createdAt} setValue={setCreatedAt} />
      <button
        type="submit"
        className={`text-white rounded-md outline-none `}
        disabled={loading}
      >
        <FaCheck className={`${
          loading ? 'text-gray-400 cursor-not-allowed' : 'text-main'
        }`} style={{ fontSize: "22px" }} onClick={handleAddPayment} />
      </button>
    </div>
    {showMsg && <ShowErrorMsg errors={errors} setErrors={setErrors} />}
    {showMsg && <ShowErrorMsg customClass="bg-blue" errors={success} setErrors={setSuccess} />}
    </>
  )
}

export default AddPayment
