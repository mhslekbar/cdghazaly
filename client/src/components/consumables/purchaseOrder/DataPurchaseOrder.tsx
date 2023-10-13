import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";
import { PurchaseOrderInterface, ShowPurchaseOrderContext } from "./types";
import { useParams } from "react-router";
import { FaEdit } from "react-icons/fa";
import { MdAttachMoney, MdRemoveCircle } from "react-icons/md";
import { Timeout, filterSpecificDate } from "../../../functions/functions";
import { ShowConsumableContext } from "../types";
import { historyPaymentInterface } from "../suppliers/types";
import InputsTotalPurchase from "./controls/InputsTotalPurchase";
import { useDispatch } from "react-redux";
import { setTotalPurchaseOrderApi } from "../../../redux/purchaseOrder/purchaseOrderApiCalls";
import ShowListBC from "./controls/ShowListBC";
import { useTranslation } from "react-i18next";

const DataPurchaseOrder:React.FC = () => {
  const { purchaseOrders } = useSelector((state: State) => state.purchaseOrder);
  const { doctorId } = useParams()
  const { showEditPurchaseOrder, setShowEditPurchaseOrder,
    selectedPurchaseOrder, setSelectedPurchaseOrder,
    showDeletePurchaseOrder, setShowDeletePurchaseOrder,
    showPaymentPurchaseOrder, setShowPaymentPurchaseOrder,
    showPurchaseOrderLine, setShowPurchaseOrderLine } = useContext(ShowPurchaseOrderContext)
  const { showSwitchDate, startDate, endDate, selectedDate, month, day, setShowSuccessMsg } = useContext(ShowConsumableContext)

  const dispatch: any = useDispatch()


  const setTotalPurchaseOrder = async (purchaseOrder: PurchaseOrderInterface) => {
    const totalAmountPurchaseOrder = (document.querySelector(`#total${purchaseOrder._id}`) as HTMLInputElement)?.value
    try {
      const response = await dispatch(setTotalPurchaseOrderApi(doctorId, purchaseOrder._id, { total: totalAmountPurchaseOrder }))
      if(response) {
        setShowSuccessMsg(true)
        setTimeout(() => setShowSuccessMsg(false), Timeout)
      }
    } catch {}
  }
  
  const { t } = useTranslation()

  return (
    <>
    <div className="grid grid-cols-1">
      <div className="col-span-2 flex flex-col border mt-3">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full sm:px-6 lg:px-8">
          <div className={`overflow-hidden`}>
            <table className="min-w-full text-sm font-light text-center">
              <thead className="border-b font-medium bg-main text-white">
                <tr>
                  <th className="px-6 py-4 border-r">#</th>
                  <th className="px-6 py-4 border-r">{t("Nom")}</th>
                  <th className="px-6 py-4 border-r">{t("Total BC")}</th>
                  <th className="px-6 py-4 border-r">{t("Total Payé")}</th>
                  <th className="px-6 py-4 border-r">{t("Reste")}</th>
                  <th className="px-6 py-4 border-r print:hidden">{t("Actions")}</th>
                </tr>
              </thead>
              <tbody>
                {
                filterSpecificDate(
                  purchaseOrders, day, month, showSwitchDate, startDate, endDate, selectedDate
                )
                .filter((purchaseOrder: PurchaseOrderInterface) => purchaseOrder.doctor._id === doctorId)
                .map((purchaseOrder: PurchaseOrderInterface, index) => {
                  const totalPayer = purchaseOrder.supplier?.historyPayment?.filter((hp: any) => hp.purchaseOrderId === purchaseOrder._id).reduce((acc, currVal: historyPaymentInterface) => acc + currVal.payment, 0) ?? 0
                  // const totalPayer = purchaseOrder.supplier?.historyPayment.filter((hp: historyPaymentInterface) => hp.purchaseOrderId === purchaseOrder._id).reduce((acc, currVal: historyPaymentInterface) => acc + currVal.payment, 0) ?? 0
                  return (
                  <tr className="border-b" key={index}>
                    <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium" onClick={() => { 
                      setSelectedPurchaseOrder(purchaseOrder)
                      setShowPurchaseOrderLine(!showPurchaseOrderLine)
                    }}>
                      {t("BC")}-{purchaseOrder.num}{"-" + (new Date(purchaseOrder.createdAt).getMonth() + 1)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium w-36">
                      <div className="flex justify-between gap-1">
                        <InputsTotalPurchase purchaseOrder={purchaseOrder} total={purchaseOrder.total} />
                        <FaEdit className="text-4xl text-main" onClick={() => setTotalPurchaseOrder(purchaseOrder)} />
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                      {totalPayer}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                      {Number(purchaseOrder.total ?? 0) - Number(totalPayer)}
                    </td>
                    <td className="bg-white print:hidden">
                      <div className="flex justify-center items-center gap-2">
                        <MdAttachMoney className="text-main" style={{ fontSize: "22px" }} onClick={() => { 
                          setSelectedPurchaseOrder(purchaseOrder)
                          setShowPaymentPurchaseOrder(!showPaymentPurchaseOrder)
                        }}/>
                        <FaEdit className="text-blue" style={{ fontSize: "22px" }} onClick={() => { 
                          setSelectedPurchaseOrder(purchaseOrder)
                          setShowEditPurchaseOrder(!showEditPurchaseOrder)
                        }}/>
                        <MdRemoveCircle className="text-red" style={{ fontSize: "22px" }} onClick={() => { 
                          setSelectedPurchaseOrder(purchaseOrder)
                          setShowDeletePurchaseOrder(!showDeletePurchaseOrder)
                        }}/>
                      </div>
                    </td>
                  </tr>
                )})}
                <tr>
                  <td colSpan={2}></td>
                  <td className="whitespace-nowrap px-4 py-2 bg-white font-medium">
                  {filterSpecificDate(
                    purchaseOrders, day, month, showSwitchDate, startDate, endDate, selectedDate
                  )
                  .filter((purchaseOrder: PurchaseOrderInterface) => purchaseOrder.doctor._id === doctorId)
                  .reduce((acc, currVal) => acc + (currVal.total ?? 0), 0)
                  }
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
    {selectedPurchaseOrder && showPurchaseOrderLine &&
        <ShowListBC ActiveShowListBC={selectedPurchaseOrder} modal={showPurchaseOrderLine} toggle={() => setShowPurchaseOrderLine(!showPurchaseOrderLine)}  />
      }
    </>
  );
};

export default DataPurchaseOrder;
