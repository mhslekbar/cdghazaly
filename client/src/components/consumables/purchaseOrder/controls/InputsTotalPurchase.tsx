import React, { useEffect, useState } from 'react'
import { InputElement } from '../../../../HtmlComponents/InputElement'
import { PurchaseOrderInterface } from '../types'

interface InputsTotalInterface {
  purchaseOrder: PurchaseOrderInterface,
  total: number
}

const InputsTotalPurchase:React.FC<InputsTotalInterface> = ({ purchaseOrder, total }) => {
  const [totalAmountPurchaseOrder, setTotalAmountPurchaseOrder] = useState(purchaseOrder.total)
  
  useEffect(() => {
    setTotalAmountPurchaseOrder(purchaseOrder.total)
  }, [purchaseOrder, setTotalAmountPurchaseOrder])

  return (
   <InputElement type='number' id={`total` + purchaseOrder._id} value={totalAmountPurchaseOrder} setValue={setTotalAmountPurchaseOrder} />
  )
}

export default InputsTotalPurchase
