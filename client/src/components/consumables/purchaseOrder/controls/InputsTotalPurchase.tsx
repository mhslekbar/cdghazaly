import React, { useEffect, useState } from 'react'
import { InputElement } from '../../../../HtmlComponents/InputElement'
import { PurchaseOrderInterface } from '../types'
import { useTranslation } from 'react-i18next'

interface InputsTotalInterface {
  purchaseOrder: PurchaseOrderInterface,
  total: number
}

const InputsTotalPurchase:React.FC<InputsTotalInterface> = ({ purchaseOrder, total }) => {
  const [totalAmountPurchaseOrder, setTotalAmountPurchaseOrder] = useState(purchaseOrder.total)
  
  useEffect(() => {
    setTotalAmountPurchaseOrder(purchaseOrder.total)
  }, [purchaseOrder, setTotalAmountPurchaseOrder])
  const { t } = useTranslation()
  return (
   <InputElement type='number' id={t(`Total`) + purchaseOrder._id} value={totalAmountPurchaseOrder} setValue={setTotalAmountPurchaseOrder} />
  )
}

export default InputsTotalPurchase
