import React, { useContext, useEffect } from "react";
import { EnumTypePayment, PaymentInterface } from "../../ManagePatient/Payments/types";
import { ShowPatientsAssuranceContext } from "./types";
import { useLocation, useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { ShowPaymentsApi } from "../../../redux/payments/paymentApiCalls";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";

const DataPatientAssurance: React.FC = () => {
  const { selectedInvoice, factureGlobal } = useContext(ShowPatientsAssuranceContext);
  const { payments } = useSelector((state: State) => state.payments)

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
  
  return (
    <div className="flex flex-col border mt-3">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full sm:px-6 lg:px-8 invoice">
          <div className="overflow-hidden">
            <table className="min-w-full text-sm font-light text-center">
              <thead className="border-b font-medium bg-main text-white">
                <tr>
                  <th className="px-6 py-4 border-r">Doss.NO</th>
                  <th className="px-6 py-4 border-r">Nom</th>
                  <th className="px-6 py-4 border-r">Prise en charge</th>
                  <th className="px-6 py-4 border-r">Type</th>
                  <th className="px-6 py-4 border-r">Montant</th>
                  <th className="px-6 py-4 border-r">Doctor</th>
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
                  <tr className="border-b" key={index}>
                    <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium hover:bg-gray-300" 
                      onClick={() => {
                        localStorage.setItem("patientMgtPrevLink", location.pathname)
                        navigate(`/patient/${doctorId}/${payment.patient._id}/Manage/devis`)
                      }}
                    >
                      {payment.patient?.assurance?.professionalId?.toString()}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium hover:bg-gray-300" 
                      onClick={() => {
                        localStorage.setItem("patientMgtPrevLink", location.pathname)
                        navigate(`/patient/${doctorId}/${payment.patient._id}/Manage/devis`)
                      }}
                    >
                      {payment.patient.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                      {payment.supported}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                      {payment.type === EnumTypePayment.PAYMENT ? "versement" : payment.type === EnumTypePayment.CONSULTATION && "cons"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                      {payment.amount}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                      {payment.doctor.username}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataPatientAssurance;
