import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { State } from '../../../../redux/store'
import { useParams } from 'react-router'
import { formatDate } from '../../../../functions/functions'
import { historyPaymentInterface } from '../types'
import { AboutSupplierContext } from './types'
import ModalPurchaseOrder from './ModalPurchaseOrder'
import { PurchaseOrderInterface } from '../../purchaseOrder/types'

const PurchaseOrderSupplier:React.FC = () => {
  const { purchaseOrders } = useSelector((state: State) => state.purchaseOrder)
  const { supplierId, doctorId } = useParams()
  const { showPurchaseOrders, setShowModalPurchaseOrder, showModalPurchaseOrder, setSelectedModalPurchaseOrder } = useContext(AboutSupplierContext)
  
  const handleShowModalPurchaseOrder = (purchaseOrder: PurchaseOrderInterface) => {
    setSelectedModalPurchaseOrder(purchaseOrder)
    setShowModalPurchaseOrder(true)
  }

  return (
    <>
    {showPurchaseOrders && 
      <>
      <div className="flex flex-col border">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full sm:px-6 lg:px-8 invoice">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light text-center">
              <thead className="border-b font-medium bg-main text-white">
                <tr>
                  <th className="px-6 py-4 border-r">#</th>
                  <th className="px-6 py-4 border-r">Nom</th>
                  <th className="px-6 py-4 border-r">Reference</th>
                  <th className="px-6 py-4 border-r">Total BC</th>
                  <th className="px-6 py-4 border-r">Total Payé</th>
                  <th className="px-6 py-4 border-r">Reste</th>
                  <th className="px-6 py-4 border-r">Date</th>
                </tr>
              </thead>
              <tbody>
                {
                purchaseOrders
                .filter((purchaseOrder: PurchaseOrderInterface) => purchaseOrder.doctor._id === doctorId && purchaseOrder.supplier._id === supplierId)
                .map((purchaseOrder: PurchaseOrderInterface, index) => {
                  const totalPayer = purchaseOrder.supplier?.historyPayment.filter((hp: any) => hp.purchaseOrderId === purchaseOrder._id).reduce((acc, currVal: historyPaymentInterface) => acc + currVal.payment, 0) ?? 0
                  // const totalPayer = purchaseOrder.supplier?.historyPayment.filter((hp: historyPaymentInterface) => hp.purchaseOrderId === purchaseOrder._id).reduce((acc, currVal: historyPaymentInterface) => acc + currVal.payment, 0) ?? 0
                  return (
                  <tr className="border-b" key={index} onClick={() => handleShowModalPurchaseOrder(purchaseOrder)}>
                    <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                      BC-{purchaseOrder.num}{"-" + (new Date(purchaseOrder.createdAt).getMonth() + 1)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                      {purchaseOrder.reference}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                      {purchaseOrder.total}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                      {totalPayer}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                      {Number(purchaseOrder.total ?? 0) - Number(totalPayer)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                      {purchaseOrder?.paymentDate && formatDate(purchaseOrder?.paymentDate?.toString())}
                    </td>
                  </tr>
                )})}
                <tr>
                  <td colSpan={3}></td>
                  <td className="whitespace-nowrap px-4 py-2 bg-white font-medium">
                  
                  {purchaseOrders
                  .filter((purchaseOrder: PurchaseOrderInterface) => purchaseOrder.doctor._id === doctorId && purchaseOrder.supplier._id === supplierId)            
                  .reduce((acc, currVal: PurchaseOrderInterface) => acc + (currVal.total ?? 0), 0)
                  }
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
        {showModalPurchaseOrder && 
          <ModalPurchaseOrder 
            modal={showModalPurchaseOrder}
            toggle={() => setShowModalPurchaseOrder(!showModalPurchaseOrder)} 
          />
        }
      </>
    }
    </>
  )
}

export default PurchaseOrderSupplier


/*
<div className='bg-white p-6 rounded-xl border shadow mt-3 max-h-96 min-h-min overflow-scroll'>
  <h1 className='text-gray-700'>Bons De commande</h1>
  <section className='grid lg:grid-cols-4 gap-2 mt-3'>
  {purchaseOrders
  .filter((purchase: PurchaseOrderInterface) => purchase.supplier._id === supplierId)
  .map((purchase: PurchaseOrderInterface) =>{
    const totalPayer = purchase.supplier?.historyPayment.filter((hp: historyPaymentInterface) => hp.purchaseOrderId === purchase._id).reduce((acc, currVal: historyPaymentInterface) => acc + currVal.payment, 0) ?? 0                    
    return (<div className='bg-[#dfe6e9] rounded-md shadow-md p-3' key={purchase._id} onClick={() => handleShowModalPurchaseOrder(purchase)}>
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
*/
