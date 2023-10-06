import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";
import {
  FaArrowCircleLeft,
  FaArrowCircleRight,
  FaEdit,
  FaPrint,
} from "react-icons/fa";
import { MdRemoveCircle } from "react-icons/md";
import {
  EnumTypeModalPayment,
  EnumTypePayment,
  PaymentInterface,
  ShowPaymentsContext,
} from "./types";
import { DevisInterface, LineDevisType } from "../Devis/types";
import { formatDate } from "../../../functions/functions";
import HeaderInvoice from "../HeaderInvoice";
import { DefaultPatientInterface, PatientInterface } from "../../patients/types";
import { useParams } from "react-router";

const DataPayments: React.FC = () => {
  const { payments } = useSelector((state: State) => state.payments);
  const { devis } = useSelector((state: State) => state.devis);
  const [totalDevis, setTotalDevis] = useState(0);
  const [totalPayments, setTotalPayments] = useState(0);

  useEffect(() => {
    setTotalPayments(
      payments
        .filter(
          (payment: PaymentInterface) =>
            payment.type === EnumTypePayment.PAYMENT
        )
        .reduce(
          (acc: number, currVal: PaymentInterface) => acc + currVal.amount,
          0
        )
    );
  }, [payments]);

  useEffect(() => {
    let sumDevis: number = 0;
    devis.map((dev: DevisInterface) => {
      sumDevis +=
        (dev.LineDevis.reduce(
          (acc: number, currVal: LineDevisType) =>
            Number(acc) + Number(currVal.price * currVal.teeth.nums.length),
          0
        )) 
        - 
        (dev.LineDevis.reduce(
          (acc: number, currVal: LineDevisType) =>
            Number(acc) + Number(currVal.price * currVal.teeth.nums.length),
          0
        ) * (dev.reduce / 100));
      return sumDevis;
    });
    setTotalDevis(sumDevis);
  }, [devis]);

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

  const { patientId } = useParams()
  const { patients } = useSelector((state: State) => state.patients)

  return (
    <>
      {payments
      .filter(
        (payment: PaymentInterface) =>
          payment.type === EnumTypePayment.PAYMENT
          && !payment.supported
      )
      .length > 0 && (
        <div className="grid grid-cols-12">
          <div className="col-span-3"></div>
          <div className="col-span-6 border">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-bloc sm:px-6 lg:px-8">
                <div className="overflow-hidden print:w-full invoice">
                  <HeaderInvoice type={`versement`} PatientInfo={patients.find((patient: PatientInterface) => patient._id === patientId) ?? DefaultPatientInterface}/>            
                  <table className="min-w-full text-left text-sm font-light text-center">
                    <thead className="border border-gray-950 font-medium bg-white text-black">
                      <tr>
                        <th className="py-1 border-r border-gray-950">Status</th>
                        <th className="py-1 border-r border-gray-950">Date</th>
                        <th className="py-1 border-r border-gray-950">Montant</th>
                        <th className="py-1 border-r border-gray-950">Mode de paiement</th>
                        <th className="py-1 print:hidden">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments
                        .filter(
                          (payment: PaymentInterface) =>
                            payment.type === EnumTypePayment.PAYMENT
                            && !payment.supported
                        )
                        .map((payment: PaymentInterface, index) => (
                          <tr className="border-b border-l border-gray-950" key={index}>
                            <td className="whitespace-nowrap py-1 border-r border-gray-950 bg-white font-medium flex justify-center">
                              {payment.amount > 0 ? (
                                <FaArrowCircleRight
                                  className="text-main"
                                  style={{
                                    fontSize: "22px",
                                  }}
                                />
                              ) : (
                                <FaArrowCircleLeft
                                  className="text-red"
                                  style={{
                                    fontSize: "22px",
                                  }}
                                />
                              )}
                            </td>
                            <td className="whitespace-nowrap py-1 border-r border-gray-950 bg-white font-medium">
                              {formatDate(payment.createdAt)}
                            </td>
                            <td className="whitespace-nowrap py-1 border-r border-gray-950 bg-white font-medium">
                              {payment.amount}
                            </td>
                            <td className="whitespace-nowrap py-1 border-r border-gray-950 bg-white font-medium">
                              {payment.method?.name || "CASH"}
                            </td>
                            <td className="bg-white h-full print:hidden border-r border-gray-950">
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
                        <td></td>
                        <td className="text-end px-2">Reste Devis:</td>
                        <td>{totalDevis - totalPayments}</td>
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

export default DataPayments;
