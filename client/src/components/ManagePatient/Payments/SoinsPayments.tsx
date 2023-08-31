import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";
import { FaPrint } from "react-icons/fa";
import {
  EnumTypePayment,
  PaymentInterface,
} from "./types";
import { formatDate } from "../../../functions/functions";
import HeaderInvoice from "../HeaderInvoice";
import { useParams } from "react-router";
import { DefaultPatientInterface, PatientInterface } from "../../patients/types";

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

  const { patients } = useSelector((state: State) => state.patients)
  const { patientId } = useParams()

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
                  <HeaderInvoice type={`soins`} PatientInfo={patients.find((patient: PatientInterface) => patient._id === patientId) ?? DefaultPatientInterface}/>            
                  <table className="min-w-full text-left text-sm font-light text-center">
                    <thead className="border border-gray-950 font-medium bg-white text-black">
                      <tr>
                        <th className="py-1 border-r border-gray-950">Date</th>
                        <th className="py-1 border-r border-gray-950">Montant</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments
                        .filter(
                          (payment: PaymentInterface) =>
                            payment.type === EnumTypePayment.SOINS
                        )
                        .map((payment: PaymentInterface, index) => (
                          <tr className="border-b border-l border-gray-950" key={index}>
                            <td className="whitespace-nowrap py-1 border-r border-gray-950 bg-white font-medium">
                              {formatDate(payment.createdAt)}
                            </td>
                            <td className="whitespace-nowrap py-1 border-r border-gray-950 bg-white font-medium">
                              {payment.amount}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                    <tfoot>
                      <tr className="font-bold">
                        <td></td>
                        <td className="text-center bg-white border border-gray-950">{totalPayments}</td>
                      </tr>
                    </tfoot>
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
