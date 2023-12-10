import React, { useRef } from 'react';
import { LinePurchaseOrderInterface, PurchaseOrderInterface } from '../../purchaseOrder/types';
import { FaPrint } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useReactToPrint } from 'react-to-print';

interface ShowListBCInterface {
  modal: boolean,
  toggle: () => void,
  ActiveShowListBC: PurchaseOrderInterface
}

const ShowListBC:React.FC<ShowListBCInterface> = ({ modal, toggle, ActiveShowListBC }) => {
  const { t } = useTranslation()
  const contentToPrint = useRef(null)
  const printDocument = useReactToPrint({
    content: () => contentToPrint.current,
    documentTitle: t("Facture"),
  })


  return (
    <div>
    {modal && (
      <>
        <div className="fixed inset-0 z-10 overflow-y-auto ">
          <div
            className="fixed inset-0 w-full h-full bg-black opacity-40"
            onClick={toggle}
          ></div>
          <div className="flex items-start min-h-screen px-4 py-8">
            <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
            <FaPrint className='text-blue mb-2' style={{ fontSize: "22px" }} onClick={printDocument} />
            <div className="flex flex-col border" >
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden invoice" ref={contentToPrint}>
                  <table className="min-w-full text-left text-sm font-light border border-gray-950">
                    <thead className="border-b font-medium bg-main text-white">
                      <tr>
                        <th className="px-3 py-3 border-r border-gray-950">{t("Nom")}</th>
                        <th className="px-3 py-3 border-r border-gray-950">{t("Quantité")}</th>
                        <th className="px-3 py-3 border-r border-gray-950">{t("Prix")}</th>
                        <th className="px-3 py-3 border-r border-gray-950">{t("Total")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ActiveShowListBC.LinePurchaseOrder.map((purchase: LinePurchaseOrderInterface, index) => (
                        <tr className="border-b border-gray-950" key={index}>
                          <td className="whitespace-nowrap px-4 py-2 border-r border-gray-950 font-medium">
                            {purchase.consumable.name}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 border-r border-gray-950 font-medium text-center">
                            {purchase.qty}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 border-r border-gray-950 font-medium"></td>
                          <td className="whitespace-nowrap px-4 py-2 border-r border-gray-950 font-medium"></td>
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

export default ShowListBC

