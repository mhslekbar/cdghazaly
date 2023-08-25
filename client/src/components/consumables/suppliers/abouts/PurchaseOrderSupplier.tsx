import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { State } from '../../../../redux/store'
import { PurchaseOrderInterface } from '../../purhcaseOrder/types'
import { useParams } from 'react-router'
import { formatDate } from '../../../../functions/functions'
import { historyPaymentInterface } from '../types'
import { AboutSupplierContext } from './types'

const PurchaseOrderSupplier = () => {
  const { purchaseOrders } = useSelector((state: State) => state.purchaseOrder)
  const { supplierId } = useParams()
  const { showPurchaseOrders } = useContext(AboutSupplierContext)
  
  return (
    <>
    {showPurchaseOrders && 
      <div className='bg-white p-6 rounded-xl border shadow mt-3 max-h-96 min-h-min overflow-scroll'>
      <h1 className='text-gray-700'>Bons De commande</h1>
      <section className='grid lg:grid-cols-4 gap-2 mt-3'>
      {purchaseOrders
      .filter((purchase: PurchaseOrderInterface) => purchase.supplier._id === supplierId)
      .map((purchase: PurchaseOrderInterface) =>{
        const totalPayer = purchase.supplier?.historyPayment.filter((hp: historyPaymentInterface) => hp.purchaseOrderId === purchase._id).reduce((acc, currVal: historyPaymentInterface) => acc + currVal.payment, 0) ?? 0                    
        return (<div className='bg-[#dfe6e9] rounded-md shadow-md p-3' key={purchase._id}>
          <p className='text-center font-bold'>BC-{purchase.num}{"-" + (new Date(purchase.createdAt).getMonth() + 1)}</p>
          <div className='flex justify-between'><p>Reference:</p> {purchase.reference}</div>
          <div className='flex justify-between'><p>Date:</p> {formatDate(purchase.paymentDate?.toString())}</div>
          <div className='flex justify-between'><p>Total BC:</p> {purchase.total}</div>
          <div className='flex justify-between'><p>Total Payer:</p> {totalPayer}</div>
          <div className='flex justify-between'><p>Reste:</p> {Number(purchase.total ?? 0) - totalPayer}</div>
        </div>)
      })}
      </section>
      </div>
    }
    </>
  )
}

export default PurchaseOrderSupplier
