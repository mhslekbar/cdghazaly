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
import HeaderInvoice from "../HeaderInvoice";
import { DefaultPatientInterface, PatientInterface } from "../../patients/types";
import { useTranslation } from "react-i18next";
import FooterInvoice from "../FooterInvoice";

const Consultations: React.FC = () => {
  const { payments } = useSelector((state: State) => state.payments);
  const [totalPayments, setTotalPayments] = useState(0);
  const [filteredCons, setFilteredCons] = useState<PaymentInterface[]>([DefaultPaymentInterface])
  
  const {
    showEditPayment,
    setShowEditPayment,
    showDeletePayment,
    setShowDeletePayment,
    setSelectedPayment,
    setModalType,
    selectedPatient,
  } = useContext(ShowPaymentsContext);

  useEffect(() => {
    setFilteredCons(payments
      .filter(
        (payment: PaymentInterface) =>  payment.patient?._id === selectedPatient && payment.type === EnumTypePayment.CONSULTATION
      ))
  }, [payments, selectedPatient])

  useEffect(() => {
    setTotalPayments(
        filteredCons
        .reduce(
          (acc: number, currVal: PaymentInterface) => acc + currVal.amount,
          0
        )
    );
  }, [filteredCons]);

  const toggleEditPayment = (payment: PaymentInterface) => {
    setShowEditPayment(!showEditPayment);
    setSelectedPayment(payment);
    setModalType(EnumTypeModalPayment.EDIT_MODAL);
  };

  const toggleDeletePayment = (payment: PaymentInterface) => {
    setShowDeletePayment(!showDeletePayment);
    setSelectedPayment(payment);
  };

  const { patients } = useSelector((state: State) => state.patients)
  const { t } = useTranslation()

  return (
    <>
      {filteredCons.length > 0 && (
        <div className="grid grid-cols-12 mt-4">
          <div className="col-span-3"></div>
          <div className="col-span-6 border">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block sm:px-6 lg:px-8">
                <div className="overflow-hidden print:w-full invoice">
                  <HeaderInvoice type={`consultation`} PatientInfo={patients.find((patient: PatientInterface) => patient._id === selectedPatient) ?? DefaultPatientInterface}/>            
                    <table className="min-w-full text-sm font-light text-center">
                      <thead className="border border-gray-950 font-medium bg-white text-black">
                        <tr>
                          <th className="py-1 border-r border-gray-950">{t("Date")}</th>
                          <th className="py-1 border-r border-gray-950">{t("Montant")}</th>
                          <th className="py-1 border-r border-gray-950">{t("Mode de paiement")}</th>
                          <th className="py-1 border-r border-gray-950">{t("Fait par")}</th>
                          <th className="py-1 print:hidden border-r border-gray-950">{t("Actions")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCons
                          .map((payment: PaymentInterface, index) => (
                            <tr className="border-b border-l border-gray-950" key={index}>
                              <td className="whitespace-nowrap py-1 border-r border-b border-gray-950 bg-white font-medium">
                                {formatDate(payment.createdAt)}
                              </td>
                              <td className="whitespace-nowrap py-1 border-r border-b border-gray-950 bg-white font-medium">
                                {payment.amount + " MRU"}
                              </td>
                              <td className="whitespace-nowrap py-1 border-r border-b border-gray-950 bg-white font-medium">
                                {payment.invoiceAssur?._id ? t("Assurance") : payment.method?.name || "CASH"}
                              </td>
                              <td className="whitespace-nowrap py-1 border-r border-b border-gray-950 bg-white font-medium">
                                {payment.user?.username}
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
                      </tbody>
                      <tfoot>
                        <tr className="font-bold">
                          <td className="text-end px-2 border print:border-gray-950">
                            {t("Total")}:
                          </td>
                          <td className="border print:border-gray-950">{totalPayments + " MRU"}</td>
                        </tr>
                        <FooterInvoice colSpan={4} />
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

export default Consultations;
