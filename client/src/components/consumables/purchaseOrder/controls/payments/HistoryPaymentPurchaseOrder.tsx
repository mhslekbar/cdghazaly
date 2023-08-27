import React, { useEffect, useState } from 'react';
import TablePayments from './TablePayments';
import AddPayment from './AddPayment';
import { useSelector } from 'react-redux';
import { State } from '../../../../../redux/store';
import { PurchaseOrderInterface, DefaultPurchaseOrderInterface } from '../../types';

interface HistoryPaymentPurchaseOrderInterface {
  modal: boolean,
  toggle: () => void,
  PurchaseOrderData: PurchaseOrderInterface,
}

const HistoryPaymentPurchaseOrder:React.FC<HistoryPaymentPurchaseOrderInterface> = ({ modal, toggle, PurchaseOrderData }) => {
  const { purchaseOrders } = useSelector((state: State) => state.purchaseOrder);
  const [PurchaseOrderInfo, setPurchaseOrderInfo] = useState<PurchaseOrderInterface>(DefaultPurchaseOrderInterface)
 
  useEffect(() => {
    setPurchaseOrderInfo(purchaseOrders.find((po: PurchaseOrderInterface) => po._id === PurchaseOrderData._id) ?? DefaultPurchaseOrderInterface)
  }, [purchaseOrders, PurchaseOrderData])
  
  return (
    <div>
      {modal && (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={toggle}
            ></div>
            <div className="flex items-start min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3">
                  <AddPayment purchaseOrder={PurchaseOrderInfo} />
                  <h1 className='text-center text-xl font-bold'>Paiement de {PurchaseOrderInfo.supplier.name} pour BC-{PurchaseOrderInfo.num}{"-" + (new Date(PurchaseOrderInfo.createdAt).getMonth() + 1)}</h1>
                  <TablePayments 
                    purchaseOrder={PurchaseOrderInfo} 
                    historyPayment={PurchaseOrderInfo.supplier
                      // ?.historyPayment.filter((hPayment: historyPaymentInterface) => hPayment.purchaseOrderId === PurchaseOrderData._id)
                      ?.historyPayment?.filter((hPayment: any) => hPayment.purchaseOrderId._id === PurchaseOrderData._id)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default HistoryPaymentPurchaseOrder
