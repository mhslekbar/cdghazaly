import React, { useContext } from 'react';
import { AboutSupplierContext } from './types';
import { LinePurchaseOrderInterface } from '../../purchaseOrder/types';
import { FaPrint } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

interface ModalPurchaseOrderInterface {
  modal: boolean,
  toggle: () => void,
}

const ModalPurchaseOrder:React.FC<ModalPurchaseOrderInterface> = ({ modal, toggle }) => {
  const { selectedModalPurchaseOrder } = useContext(AboutSupplierContext)
  const { t } = useTranslation()
  return (
    <div>
      {modal && (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={toggle}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
              <FaPrint className='text-blue mb-2' style={{ fontSize: "22px" }} onClick={() => window.print()} />
              <div className="flex flex-col border">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                      <thead className="border-b font-medium bg-main text-white">
                        <tr>
                          <th className="px-3 py-3 border-r">{t("Nom")}</th>
                          <th className="px-3 py-3 border-r">{t("Quantité")}</th>
                          <th className="px-3 py-3 border-r">{t("Prix")}</th>
                          <th className="px-3 py-3">{t("Total")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedModalPurchaseOrder.LinePurchaseOrder.map((purchase: LinePurchaseOrderInterface, index) => (
                          <tr className="border-b" key={index}>
                            <td className="whitespace-nowrap px-4 py-2 border-r font-medium">
                              {purchase.consumable.name}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 border-r font-medium text-center">
                              {purchase.qty}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 border-r font-medium"></td>
                            <td className="whitespace-nowrap px-4 py-2 border-r font-medium"></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ModalPurchaseOrder

