import React, { useContext } from 'react'
import { AboutSupplierContext } from './types'
import { formatDate } from '../../../../functions/functions'

const HistoryPaymentSupplier:React.FC = () => {
  const { selectedSupplier, showHistoryPayment } = useContext(AboutSupplierContext)
  return (
    <>
    {showHistoryPayment && 
      <div className="flex flex-col border mt-3">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light text-center">
              <thead className="border-b font-medium bg-main text-white">
                <tr>
                  <th className="px-6 py-4 border-r">BC</th>
                  <th className="px-6 py-4 border-r">Montant</th>
                  <th className="px-6 py-4 border-r">Date</th>
                  {/* <th className="px-6 py-4">Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {selectedSupplier.historyPayment.map((hPayment: any, index) => (
                  <tr className="border-b" key={index}>
                    <td className="whitespace-nowrap px-4 py-2 border-r font-medium bg-white">
                      BC-{hPayment.purchaseOrderId?.num}{"-" + (new Date(hPayment.purchaseOrderId?.createdAt).getMonth() + 1)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 border-r font-medium bg-white">
                      {hPayment.payment}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 border-r font-medium  bg-white">
                      {formatDate(hPayment.createdAt?.toString())}
                    </td>
                    {/* <td className="whitespace-nowrap px-4 py-2 border-r font-medium  bg-white"></td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>}
    </>
  )
}

export default HistoryPaymentSupplier
