import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";
import { useParams } from "react-router";
import { FaEdit } from "react-icons/fa";
import { MdRemoveCircle } from "react-icons/md";
import { PaymentLabType, ShowLabPaymentsContext } from "./types";
import { formatDate } from "../../../functions/functions";
import { useDispatch } from "react-redux";
import { ShowPaymentLabApi } from "../../../redux/laboratory/payments/paymentLabApiCalls";

const DataLabPayment: React.FC = () => {
  const { paymentLab } = useSelector((state: State) => state.paymentLab);
  const { doctorId, labId } = useParams();

  const dispatch: any = useDispatch();

  useEffect(() => {
    const fetchLab = async () => {
      try {
        await dispatch(ShowPaymentLabApi(labId || ""));
      } catch {}
    };
    fetchLab();
  }, [dispatch, labId]);

  const {
    showEditPLabModal,
    setShowEditPLabModal,
    showDeletePLabModal,
    setShowDeletePLabModal,
    setSelectedPaymentLab,
  } = useContext(ShowLabPaymentsContext);

  const toggleEditUser = (payment: PaymentLabType) => {
    setShowEditPLabModal(!showEditPLabModal);
    setSelectedPaymentLab(payment);
  };

  const toggleDeleteUser = (payment: PaymentLabType) => {
    setShowDeletePLabModal(!showDeletePLabModal);
    setSelectedPaymentLab(payment);
  };

  const [totalPayment, setTotalPayment] = useState<number>(0)
  
  useEffect(() => {
    setTotalPayment(paymentLab
      .filter(
        (payment: PaymentLabType) =>
        payment.doctor._id === doctorId
      )
      .sort((a: PaymentLabType, b: PaymentLabType) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .reduce((acc: number, currVal: PaymentLabType) => acc + Number(currVal.amount), 0)
      )
  }, [paymentLab, doctorId])

  return (
    <div className="">
      {paymentLab.length > 0 && (
        <div className="flex flex-col border">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light text-center">
                  <thead className="border-b font-medium bg-main text-white">
                    <tr>
                      <th className="px-3 py-2 border-r">Montant</th>
                      <th className="px-3 py-2 border-r">Comment</th>
                      <th className="px-3 py-2 border-r">Date</th>
                      <th className="px-3 py-2 border-r">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentLab
                      .filter(
                        (payment: PaymentLabType) =>
                        payment.doctor._id === doctorId
                      )
                      .sort((a: PaymentLabType, b: PaymentLabType) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                      .map((payment: PaymentLabType, index: number) => {
                        return (
                          <tr className="border-b" key={index}>
                            <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                              {payment.amount}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                              {payment.comment}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                              {formatDate(payment.createdAt.toString())}
                            </td>
                            <td className="bg-white h-full">
                              <div className="flex justify-center">
                                <FaEdit
                                  className="text-blue"
                                  style={{
                                    fontSize: "22px",
                                  }}
                                  onClick={() => toggleEditUser(payment)}
                                />
                                <MdRemoveCircle
                                  className="text-red"
                                  style={{
                                    fontSize: "22px",
                                  }}
                                  onClick={() => toggleDeleteUser(payment)}
                                />
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                  <tr className="border-b">
                  <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">{totalPayment}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataLabPayment;

// ?.slice()
// .sort((a: PaymentLabType, b: PaymentLabType) => {
//   const createdAtA = new Date(a.createdAt);
//   const createdAtB = new Date(b.createdAt);

//   return createdAtB.getTime() - createdAtA.getTime();
// })
