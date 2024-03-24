import React, { useContext, useEffect } from "react";
import { EnumTypePayment, PaymentInterface } from "../../ManagePatient/Payments/types";
import { ShowPatientsAssuranceContext } from "./types";
import { useLocation, useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { ShowPaymentsApi } from "../../../redux/payments/paymentApiCalls";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";
import { useTranslation } from "react-i18next";
import { FaEye } from "react-icons/fa";
import { PatientInterface } from "../../patients/types";

const DataPatientAssurance: React.FC = () => {
  const { selectedInvoice,  factureGlobal, showPrintModal, setShowPrintModal, setSelectedPatient, setInvoiceType, patientAssRef } = useContext(ShowPatientsAssuranceContext);
  const { payments } = useSelector((state: State) => state.payments)

  const togglePrintModal = (patient: PatientInterface, type: string) => {
    setShowPrintModal(!showPrintModal)
    setSelectedPatient(patient?._id)
    setInvoiceType(type)
  }

  const { doctorId } = useParams() 
  const dispatch: any = useDispatch()
  
  useEffect(() => {
    const fetchAllPayments = async () => {
      try {
        await dispatch(ShowPaymentsApi())
      } catch { }
    };
    fetchAllPayments();
  }, [dispatch]);

  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()

  return (
    <div className="flex flex-col border mt-3">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full sm:px-4 lg:px-8">
          <div className={`overflow-hidden ${!showPrintModal ? "invoice" : ""}`} ref={!showPrintModal ? patientAssRef : null}>
            <table className="min-w-full text-sm font-light text-center">
              <thead className="border font-medium bg-main text-white border-gray-950">
                <tr>
                  <th className="px-4 py-4 border-r border-gray-950">{t("DOSS.NO")}</th>
                  <th className="px-4 py-4 border-r border-gray-950">{t("Nom")}</th>
                  <th className="px-4 py-4 border-r border-gray-950">{t("Prise en charge")}</th>
                  <th className="px-4 py-4 border-r border-gray-950">{t("Type")}</th>
                  <th className="px-4 py-4 border-r border-gray-950">{t("Montant")}</th>
                  <th className="px-4 py-4 border-r border-gray-950">{t("Montant Couvré")}</th>
                  {factureGlobal && 
                    <th className="px-4 py-4 border-r border-gray-950">{t("Docteur")}</th>
                  }
                  <th className="px-4 py-4 border-r border-gray-950 print:hidden">{t("Actions")}</th>
                </tr>
              </thead>
              <tbody>
              {payments
                .filter((payment: PaymentInterface) => 
                  (payment.supported 
                  && payment.invoiceAssur?._id === selectedInvoice?._id )
                  && (factureGlobal || payment.doctor._id === doctorId)
                )
                .sort((a: PaymentInterface, b: PaymentInterface) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((payment: PaymentInterface, index) => (
                  <tr className="border-b border-l border-gray-950" key={index}>
                    <td className="whitespace-nowrap px-4 py-2 border-r bg-white border-gray-950 font-medium hover:bg-gray-300" 
                      onClick={() => {
                        localStorage.setItem("patientMgtPrevLink", location.pathname)
                        navigate(`/patient/${doctorId}/${payment.patient._id}/Manage/devis`)
                      }}
                    >
                      {payment.patient?.assurance?.professionalId?.toString()}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 border-r bg-white border-gray-950 font-medium hover:bg-gray-300" 
                      onClick={() => {
                        localStorage.setItem("patientMgtPrevLink", location.pathname)
                        navigate(`/patient/${doctorId}/${payment.patient._id}/Manage/devis`)
                      }}
                    >
                      {payment.patient.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 border-r bg-white border-gray-950 font-medium">
                      {payment.supported}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 border-r bg-white border-gray-950 font-medium">
                      {payment.type === EnumTypePayment.PAYMENT ? "versement" : payment.type === EnumTypePayment.CONSULTATION && "cons"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 border-r bg-white border-gray-950 font-medium">
                      {payment.amount + " MRU"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 border-r bg-white border-gray-950 font-medium">
                      {(payment.amount * Number(payment.patient?.assurance?.percentCovered) / 100)  + " MRU"}
                    </td>
                    {factureGlobal && 
                      <td className="whitespace-nowrap px-4 py-2 border-r bg-white border-gray-950 font-medium">
                        {payment.doctor.username}
                      </td>
                    }
                    <td className="whitespace-nowrap px-4 py-2 border-r bg-white border-gray-950 font-medium print:hidden">
                      <div className="flex justify-center">
                        <p onClick={() => togglePrintModal(payment.patient, payment.type === EnumTypePayment.PAYMENT ? "invoice" : payment.type === EnumTypePayment.CONSULTATION ? "cons" : "")}><FaEye className="text-xl text-main" /></p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="text-3xl">
                  <td colSpan={4} className="whitespace-nowrap px-4 py-2 border-r border-gray-950 font-medium">
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 border-r border-b bg-white border-gray-950 font-bold">
                    {payments
                      ?.filter((payment: PaymentInterface) => 
                        (payment.supported 
                        && payment.invoiceAssur?._id === selectedInvoice?._id )
                        && (factureGlobal || payment.doctor._id === doctorId)
                      )
                      ?.reduce((acc: number, currVal: PaymentInterface) => acc + Number(currVal.amount), 0)
                    } {" MRU"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 border-r border-b bg-white border-gray-950 font-bold">
                    {payments
                      ?.filter((payment: PaymentInterface) => 
                        (payment.supported 
                        && payment.invoiceAssur?._id === selectedInvoice?._id )
                        && (factureGlobal || payment.doctor._id === doctorId)
                      )
                      ?.reduce((acc: number, currVal: PaymentInterface) => 
                        acc + (Number(currVal.amount) * Number(currVal.patient?.assurance?.percentCovered) / 100)
                      , 0)
                    }{" MRU"}
                  </td>
                  {
                    factureGlobal && 
                    <td className="whitespace-nowrap px-4 py-2 border-gray-950 font-medium">
                    </td>
                  }
                </tr>

              </tfoot>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataPatientAssurance;
