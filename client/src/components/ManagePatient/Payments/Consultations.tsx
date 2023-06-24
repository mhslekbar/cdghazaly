import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";
import { FaEdit, FaPrint } from "react-icons/fa";
import { MdRemoveCircle } from "react-icons/md";
import {
  DefaultPaymentInterface,
  EnumTypeModalPayment,
  EnumTypePayment,
  PaymentInterface,
  ShowPaymentsContext,
} from "./types";
import { formatDate } from "../../../functions/functions";

const Consultations: React.FC = () => {
  const { payments } = useSelector((state: State) => state.payments);
  const [totalPayments, setTotalPayments] = useState(0);
  const [filteredCons, setFilteredCons] = useState<PaymentInterface[]>([DefaultPaymentInterface])
  
  useEffect(() => {
    setFilteredCons(payments
      .filter(
        (payment: PaymentInterface) => payment.type === EnumTypePayment.CONSULTATION
      ))
  }, [payments])


  useEffect(() => {
    setTotalPayments(
        filteredCons
        .reduce(
          (acc: number, currVal: PaymentInterface) => acc + currVal.amount,
          0
        )
    );
  }, [filteredCons]);

  const {
    showEditPayment,
    setShowEditPayment,
    showDeletePayment,
    setShowDeletePayment,
    setSelectedPayment,
    setModalType,
  } = useContext(ShowPaymentsContext);

  const toggleEditPayment = (payment: PaymentInterface) => {
    setShowEditPayment(!showEditPayment);
    setSelectedPayment(payment);
    setModalType(EnumTypeModalPayment.EDIT_MODAL);
  };

  const toggleDeletePayment = (payment: PaymentInterface) => {
    setShowDeletePayment(!showDeletePayment);
    setSelectedPayment(payment);
  };

  return (
    <>
      {filteredCons.length > 0 && (
        <div className="grid grid-cols-12 mt-4">
          <div className="col-span-3"></div>
          <div className="col-span-6 border">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-bloc sm:px-6 lg:px-8">
                <div className="overflow-hidden print:w-full invoice">
                  <table className="min-w-full text-left text-sm font-light text-center">
                    <thead className="border-b font-medium bg-main text-white">
                      <tr>
                        <th className="py-1 border-r">Date</th>
                        <th className="py-1 border-r">Montant</th>
                        <th className="py-1 print:hidden">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCons
                        .map((payment: PaymentInterface, index) => (
                          <tr className="border-b" key={index}>
                            <td className="whitespace-nowrap py-1 border-r bg-white font-medium">
                              {formatDate(payment.createdAt)}
                            </td>
                            <td className="whitespace-nowrap py-1 border-r bg-white font-medium">
                              {payment.amount}
                            </td>
                            <td className="bg-white h-full print:hidden">
                              <div className="flex justify-center">
                                <FaEdit
                                  className="text-blue"
                                  style={{
                                    fontSize: "22px",
                                  }}
                                  onClick={() => toggleEditPayment(payment)}
                                />
                                <MdRemoveCircle
                                  className="text-red"
                                  style={{
                                    fontSize: "22px",
                                  }}
                                  onClick={() => toggleDeletePayment(payment)}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                      <tr className="font-bold">
                        <td className="text-end px-2">
                          Total:
                        </td>
                        <td>{totalPayments}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-3">
            <button
              className="bg-blue p-2 border rounded"
              onClick={() => window.print()}
            >
              <FaPrint />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Consultations;
