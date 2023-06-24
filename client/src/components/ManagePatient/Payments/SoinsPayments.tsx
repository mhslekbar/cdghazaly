import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";
import { FaPrint } from "react-icons/fa";
import {
  EnumTypePayment,
  PaymentInterface,
} from "./types";
import { formatDate } from "../../../functions/functions";

const SoinsPayments: React.FC = () => {
  const { payments } = useSelector((state: State) => state.payments);
  const [totalPayments, setTotalPayments] = useState(0);

  useEffect(() => {
    setTotalPayments(
      payments
        .filter(
          (payment: PaymentInterface) => payment.type === EnumTypePayment.SOINS
        )
        .reduce(
          (acc: number, currVal: PaymentInterface) => acc + currVal.amount,
          0
        )
    );
  }, [payments]);


  return (
    <>
      {payments
      .filter(
        (payment: PaymentInterface) =>
          payment.type === EnumTypePayment.SOINS
      )
      .length > 0 && (
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
                      </tr>
                    </thead>
                    <tbody>
                      {payments
                        .filter(
                          (payment: PaymentInterface) =>
                            payment.type === EnumTypePayment.SOINS
                        )
                        .map((payment: PaymentInterface, index) => (
                          <tr className="border-b" key={index}>
                            <td className="whitespace-nowrap py-1 border-r bg-white font-medium">
                              {formatDate(payment.createdAt)}
                            </td>
                            <td className="whitespace-nowrap py-1 border-r bg-white font-medium">
                              {payment.amount}
                            </td>
                          </tr>
                        ))}
                      <tr className="font-bold">
                        <td></td>
                        <td className="text-center">{totalPayments}</td>
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

export default SoinsPayments;
