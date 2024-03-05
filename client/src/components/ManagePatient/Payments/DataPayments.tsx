import React, { useContext, useEffect, useRef, useState } from "react";
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
import { formatDate, formatHourAndMinute } from "../../../functions/functions";
import HeaderInvoice from "../HeaderInvoice";
import { DefaultPatientInterface, PatientInterface } from "../../patients/types";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import FooterInvoice from "../FooterInvoice";
import { InputRadio } from "../../../HtmlComponents/InputRadio";
import { useReactToPrint } from "react-to-print";

interface props {
  typeData: string
}

const DataPayments: React.FC<props> = ({ typeData }) => {
  const { payments } = useSelector((state: State) => state.payments);
  const { devis } = useSelector((state: State) => state.devis);
  const [totalDevis, setTotalDevis] = useState(0);
  const [totalPayments, setTotalPayments] = useState(0);

  const { patientId } = useParams()

  useEffect(() => {
    setTotalPayments(
      payments
        .filter((payment: PaymentInterface) => payment.patient?._id === patientId)
        .filter(
          (payment: PaymentInterface) =>
            payment.type === EnumTypePayment.PAYMENT
        )
        .reduce(
          (acc: number, currVal: PaymentInterface) => acc + currVal.amount,
          0
        )
    );
  }, [payments, patientId]);

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

  const { patients } = useSelector((state: State) => state.patients)

  const { t } = useTranslation()

  const [typeInvoice, setTypeInvoice] = useState("En entier")
  const [invoiceIndex, setInvoiceIndex] = useState(-1)

  const invoiceRef = useRef(null)

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    documentTitle: "Payments",
    onAfterPrint: () => setInvoiceIndex(-1), // Reset after printing
  });

  const printInvoice = (currentIndex: number) => {
    if (invoiceIndex === -1) {
      setInvoiceIndex(currentIndex);
      setTimeout(() => handlePrint(), 0);
    } else {
      handlePrint();
    }
  };

  return (
    <>
      <section className='grid md:grid-cols-3 gap-2'>
          <div className='flex justify-start gap-2 mt-3'>
            <p className='text-lg'>Afficher</p>
            <InputRadio labelName='En entier' id='En entier' name='typeInvoice' checked={typeInvoice === "En entier"} value={"En entier"} setValue={setTypeInvoice}/>
            <InputRadio labelName='Par reçu' id='Par reçu' name='typeInvoice' checked={typeInvoice === "Par reçu"} value={"Par reçu"} setValue={setTypeInvoice}/>
          </div>
      </section>

      {typeInvoice === "Par reçu" && payments
      ?.filter((payment: PaymentInterface) => payment.patient?._id === patientId)
      ?.filter(
        (payment: PaymentInterface) =>
          payment.type === EnumTypePayment.PAYMENT 
          && (typeData === "payment" ? !payment.supported : payment.supported) 
      )
      .map((payment: PaymentInterface, index) => (
        <div className="grid grid-cols-12">
          <div className="col-span-3"></div>
          <div className="col-span-6 flex flex-col border">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block sm:px-6 lg:px-8">
                <div className={`overflow-hidden print:w-full invoice`} ref={index === invoiceIndex ? invoiceRef : null}>
                  <HeaderInvoice type={`versement`} PatientInfo={patients.find((patient: PatientInterface) => patient._id === patientId) ?? DefaultPatientInterface}/>            
                  <table className="min-w-full text-sm font-light text-center">
                    <thead className="border border-gray-950 font-medium bg-white text-black">
                      <tr>
                        <th className="py-1 border-r border-gray-950">{t("Status")}</th>
                        <th className="py-1 border-r border-gray-950">{t("Date")}</th>
                        <th className="py-1 border-r border-gray-950">{t("Montant")}</th>
                        <th className="py-1 border-r border-gray-950">{t("Mode de paiement")}</th>
                        <th className="py-1 border-r border-gray-950 print:hidden">{t("Fait par")}</th>
                        <th className="py-1 print:hidden">{t("Actions")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-l border-gray-950" key={index}>
                        <td className="whitespace-nowrap py-1 border-r border-gray-950 bg-white font-medium flex justify-center">
                          {payment.amount > 0 ? (
                            <FaArrowCircleRight className="text-main" style={{ fontSize: "22px" }} />
                          ) : (
                            <FaArrowCircleLeft className="text-red" style={{ fontSize: "22px" }} />
                          )}
                        </td>
                        <td className="whitespace-nowrap py-1 border-r border-gray-950 bg-white font-medium">
                          {formatDate(payment.paymentDate) + " "}
                          {formatHourAndMinute(payment.paymentDate)}
                        </td>
                        <td className="whitespace-nowrap py-1 border-r border-gray-950 bg-white font-medium">
                          {payment.amount}
                        </td>
                        <td className="whitespace-nowrap py-1 border-r border-gray-950 bg-white font-medium">
                          {payment.method?.name || "CASH"}
                        </td>
                        <td className="whitespace-nowrap py-1 border-r border-b border-gray-950 bg-white font-medium  print:hidden">
                          {payment.user?.username}
                        </td>
                        <td className="bg-white h-full print:hidden border-r border-gray-950">
                          <div className="flex justify-center">
                            <FaEdit className="text-blue" style={{ fontSize: "22px" }} onClick={() => toggleEditPayment(payment)} />
                            <MdRemoveCircle className="text-red" style={{ fontSize: "22px" }} onClick={() => toggleDeletePayment(payment)}
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <FooterInvoice colSpan={4} />
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-3">
          {/* disabled={invoiceIndex === -1 ? true : false} */}
            <button  className="bg-blue p-2 border rounded" onClick={() => printInvoice(index)}>
              <FaPrint />
            </button>
          </div>
        </div>
      ))}

    {typeInvoice === "En entier" && 
        <div className="grid grid-cols-12">
          <div className="col-span-3"></div>
          <div className="col-span-6 flex flex-col border">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block sm:px-6 lg:px-8">
                <div className="overflow-hidden print:w-full invoice">
                  <HeaderInvoice type={`versement`} PatientInfo={patients.find((patient: PatientInterface) => patient._id === patientId) ?? DefaultPatientInterface}/>            
                  <table className="min-w-full text-sm font-light text-center">
                    <thead className="border border-gray-950 font-medium bg-white text-black">
                      <tr>
                        <th className="py-1 border-r border-gray-950">{t("Status")}</th>
                        <th className="py-1 border-r border-gray-950">{t("Date")}</th>
                        <th className="py-1 border-r border-gray-950">{t("Montant")}</th>
                        <th className="py-1 border-r border-gray-950">{t("Mode de paiement")}</th>
                        <th className="py-1 border-r border-gray-950 print:hidden">{t("Fait par")}</th>
                        <th className="py-1 print:hidden">{t("Actions")}</th>
                      </tr>
                    </thead>
                    <tbody>
                    {payments
                        ?.filter((payment: PaymentInterface) => payment.patient?._id === patientId)
                        ?.filter(
                          (payment: PaymentInterface) =>
                            payment.type === EnumTypePayment.PAYMENT 
                            && (typeData === "payment" ? !payment.supported : payment.supported) 
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
                          {formatDate(payment.paymentDate) + " "}
                          {formatHourAndMinute(payment.paymentDate)}
                        </td>
                        <td className="whitespace-nowrap py-1 border-r border-gray-950 bg-white font-medium">
                          {payment.amount}
                        </td>
                        <td className="whitespace-nowrap py-1 border-r border-gray-950 bg-white font-medium">
                          {payment.method?.name || "CASH"}
                        </td>
                        <td className="whitespace-nowrap py-1 border-r border-b border-gray-950 bg-white font-medium  print:hidden">
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
                        <td></td>
                        <td className="text-end px-2">{t("Reste du devis")}:</td>
                        <td>{totalDevis - totalPayments}</td>
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
      }
    </>
  );
};

export default DataPayments;
