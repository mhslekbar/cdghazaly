import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";
import { PurchaseOrderInterface } from "./types";
import { useParams } from "react-router";

const DataPurchaseOrder:React.FC = () => {
  const { purchaseOrders } = useSelector((state: State) => state.purchaseOrder);
  const { doctorId } = useParams()

  return (
    <div className="grid grid-cols-4 gap-2 mt-3">
      {purchaseOrders
      .filter((purchaseOrder: PurchaseOrderInterface) => purchaseOrder.doctor._id === doctorId)
      .map((purchaseOrder: PurchaseOrderInterface, index) => (
        <section className="bg-white border shadow rounded-lg px-6 py-3" key={index}>
          <p className="">
            Nom: {purchaseOrder.num}
          </p>
          <p className="">
            Reference: {purchaseOrder.reference}
          </p>
          <p className="">
            Total: {purchaseOrder.total}
          </p>
          <p></p>
        </section>
      ))}
    </div>
  );
};

export default DataPurchaseOrder;


/**
 
    <div className="flex flex-col border">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium bg-main text-white">
                <tr>
                  <th className="px-6 py-4">Nom</th>
                  <th className="px-6 py-4">Reference</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {purchaseOrders.map((purchaseOrder: PurchaseOrderInterface, index) => (
                  <tr className="border-b" key={index}>
                    <td className="whitespace-nowrap px-4 py-2 border-r font-medium">
                      {purchaseOrder.num}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 border-r font-medium">
                      {purchaseOrder.reference}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 border-r font-medium">
                      {purchaseOrder.total}
                    </td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

*/