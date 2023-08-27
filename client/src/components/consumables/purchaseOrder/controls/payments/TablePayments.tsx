import React, { useState } from "react";
import { historyPaymentInterface } from "../../../suppliers/types";
import { hideMsg } from "../../../../../functions/functions";
import { MdRemoveCircle } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import InputEditPayment from "./InputEditPayment";
import { DeletePaymentPurchaseOrderApi, EditPaymentPurchaseOrderApi } from "../../../../../redux/purchaseOrder/purchaseOrderApiCalls";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { ShowSuppliersApi } from "../../../../../redux/suppliers/supplierApiCalls";
import { PurchaseOrderInterface } from "../../types";

interface TablePaymentsInterface {
  historyPayment: historyPaymentInterface[],
  purchaseOrder: PurchaseOrderInterface
}

const TablePayments: React.FC<TablePaymentsInterface> = ({ historyPayment, purchaseOrder }) => {
  const dispatch: any = useDispatch()
  const { doctorId } = useParams()
  const [errors, setErrors] = useState<string[]>([])
  const [success, setSuccess] = useState<string[]>([])
  const [showMsg, setShowMsg] = useState(false)

  const handleEditPayment = async (paymentId: string) => {
    try {
      const payment = (document.querySelector(`#PaymentId${paymentId}`) as HTMLInputElement)?.value;
      const createdAt = (document.querySelector(`#CreatedAtId${paymentId}`) as HTMLInputElement)?.value;
      
      const response = await dispatch(EditPaymentPurchaseOrderApi(doctorId, purchaseOrder._id, paymentId, { payment, createdAt, supplier: purchaseOrder.supplier }))
      if(response === true) {
        setErrors([])
        setSuccess(["Modifier avec success"])
        setShowMsg(true)
        setTimeout(() => setShowMsg(false), 1000)
        await dispatch(ShowSuppliersApi())
      } else {
        setErrors(response)
        setSuccess([])
        setShowMsg(true)
        setTimeout(() => setShowMsg(false), 1000)
      }
    } catch {}
  }

  const handleDeletePayment = async (paymentId: string) => {
    try {
      const response = await dispatch(DeletePaymentPurchaseOrderApi(doctorId, purchaseOrder._id, paymentId))
      if(response === true) {
        setErrors([])
        setSuccess(["Supprimer avec success"])
        setShowMsg(true)
        setTimeout(() => setShowMsg(false), 1000)
        await dispatch(ShowSuppliersApi())
      } else {
        setErrors(response)
        setSuccess([])
        setShowMsg(true)
        setTimeout(() => setShowMsg(false), 1000)
      }
    } catch {}
  }

  return (
    <>
    {showMsg && errors.length > 0 &&
      errors.map((err, index) => (
        <p
          className="p-3 my-2 rounded bg-red text-white msg"
          key={index}
          onClick={(e) => hideMsg(e, errors, setErrors)}
        >
          {err}
        </p>
    ))}
    {showMsg && success.length > 0 &&
      success.map((err, index) => (
        <p
          className="p-2 rounded bg-blue text-white msg"
          key={index}
          onClick={(e) => hideMsg(e, success, setSuccess)}
        >
          {err}
        </p>
    ))}
    <div className="flex flex-col border mt-2">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light text-center">
              <thead className="border-b font-medium bg-main text-white">
                <tr>
                  <th className="px-6 py-4 border-r">Payment</th>
                  <th className="px-6 py-4 border-r">Date</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                historyPayment
                ?.slice()
                ?.sort((a: historyPaymentInterface, b: historyPaymentInterface) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                ?.map((hp: historyPaymentInterface, index) => {
                  return (
                  <tr className="border-b" key={index}>
                    <td className="whitespace-nowrap px-4 py-2 border-r font-medium text-left">
                      <InputEditPayment type="number" paymentId={hp._id} value={hp.payment}/>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 border-r font-medium text-left">
                      <InputEditPayment type="date" paymentId={hp._id} value={hp.createdAt.toString()}/>
                    </td>
                    <td className="bg-white print:hidden">
                      <div className="flex justify-center items-center gap-2">
                        <FaEdit className="text-blue" style={{ fontSize: "22px" }} onClick={() => handleEditPayment(hp._id)} />
                        <MdRemoveCircle className="text-red" style={{ fontSize: "22px" }} onClick={() => handleDeletePayment(hp._id)} />
                      </div>
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default TablePayments;
