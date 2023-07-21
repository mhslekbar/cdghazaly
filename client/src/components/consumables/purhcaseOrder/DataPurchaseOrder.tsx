import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";
import { PurchaseOrderInterface, ShowPurchaseOrderContext } from "./types";
import { useParams } from "react-router";
import { FaEdit } from "react-icons/fa";
import { MdRemoveCircle } from "react-icons/md";
import { filterSpecificDate, formatDate } from "../../../functions/functions";
import { ShowConsumableContext } from "../types";

const DataPurchaseOrder:React.FC = () => {
  const { purchaseOrders } = useSelector((state: State) => state.purchaseOrder);
  const { doctorId } = useParams()
  const { showEditPurchaseOrder, setShowEditPurchaseOrder,
    setSelectedPurchaseOrder,
    showDeletePurchaseOrder, setShowDeletePurchaseOrder } = useContext(ShowPurchaseOrderContext)
  const { showSwitchDate, startDate, endDate, selectedDate, month, day } = useContext(ShowConsumableContext)

  return (
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
                  <th className="px-6 py-4 border-r">Total</th>
                  <th className="px-6 py-4 border-r">Date</th>
                  <th className="px-6 py-4 border-r print:hidden">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                filterSpecificDate(
                  purchaseOrders, day, month, showSwitchDate, startDate, endDate, selectedDate
                )
                .filter((purchaseOrder: PurchaseOrderInterface) => purchaseOrder.doctor._id === doctorId)
                .map((purchaseOrder: PurchaseOrderInterface, index) => {
                  return (
                  <tr className="border-b" key={index}>
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
                      {purchaseOrder?.paymentDate && formatDate(purchaseOrder?.paymentDate?.toString())}
                    </td>
                    <td className="bg-white print:hidden">
                      <div className="flex justify-center items-center">
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
                  <td colSpan={3}></td>
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
  );
};

export default DataPurchaseOrder;


/**
 * 
 *     <div className="grid grid-cols-4 gap-2 mt-3">
      {
      filterSpecificDate(
        purchaseOrders, day, month, showSwitchDate, startDate, endDate, selectedDate
      )
      .filter((purchaseOrder: PurchaseOrderInterface) => purchaseOrder.doctor._id === doctorId)
      .map((purchaseOrder: PurchaseOrderInterface, index) => (
        <section className="bg-white border shadow rounded-lg px-6 py-3" key={index}>
          <p className="">
            Nom:{purchaseOrder.num}{"-" + (new Date(purchaseOrder.createdAt).getMonth() + 1)}
          </p>
          <p className="">
            Reference: {purchaseOrder.reference}
          </p>
          <p className="">
            Total: {purchaseOrder.total}
          </p>
          {purchaseOrder.paymentDate && 
            <p className="">
              Date de paiement: {formatDate(purchaseOrder.paymentDate.toString())}
            </p>
          }
          <div className="flex justify-center items-center">
            <FaEdit className="text-blue" style={{ fontSize: "22px" }} onClick={() => { 
              setSelectedPurchaseOrder(purchaseOrder)
              setShowEditPurchaseOrder(!showEditPurchaseOrder)
            }}/>
            <MdRemoveCircle className="text-red" style={{ fontSize: "22px" }} onClick={() => { 
              setSelectedPurchaseOrder(purchaseOrder)
              setShowDeletePurchaseOrder(!showDeletePurchaseOrder)
            }}/>
          </div>
        </section>
      ))}
    </div>
 


*/