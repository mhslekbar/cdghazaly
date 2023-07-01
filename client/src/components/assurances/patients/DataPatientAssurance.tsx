import React, { useContext, useEffect } from "react";
import { get } from "../../../requestMethods";
import { PaymentInterface } from "../../ManagePatient/Payments/types";
import { RegNo } from "../../../functions/functions";
import { ShowPatientsAssuranceContext } from "./types";
import { useLocation, useNavigate, useParams } from "react-router";
import { UserInterface } from "../../users/types";

const DataPatientAssurance: React.FC = () => {
  const { selectedInvoice, payments, setPayments } = useContext(ShowPatientsAssuranceContext);

  const { doctorId } = useParams() 

  useEffect(() => {
    const fetchAllPayments = async () => {
      try {
        const response = await get(`payment/all_payments`);
        setPayments(response.data.success);
      } catch (err) {
        console.log("err: ", err)
      }
    };
    fetchAllPayments();
  }, [setPayments]);

  const navigate = useNavigate()
  const location = useLocation()
  
  return (
    <div className="flex flex-col border mt-3">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light text-center">
              <thead className="border-b font-medium bg-main text-white">
                <tr>
                  <th className="px-6 py-4 border-r">Doss.NO</th>
                  <th className="px-6 py-4 border-r">Nom</th>
                  <th className="px-6 py-4 border-r">Type</th>
                  <th className="px-6 py-4 border-r">Montant</th>
                  <th className="px-6 py-4 border-r">Doctor</th>
                </tr>
              </thead>
              <tbody>
              {payments
                // && selectedInvoice?.doctor.some((doctor: UserInterface) => doctor._id === doctorId)
                // payment.doctor._id === doctorId
                .filter((payment: PaymentInterface) => payment.supported && payment.invoiceAssur === selectedInvoice?._id && selectedInvoice?.doctor.some((doctor: UserInterface) => doctor._id === doctorId))
                .sort((a: PaymentInterface, b: PaymentInterface) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((payment: PaymentInterface, index) => (
                  <tr className="border-b" key={index}>
                    <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium hover:bg-gray-300" 
                      onClick={() => {
                        localStorage.setItem("patientMgtPrevLink", location.pathname)
                        navigate(`/patient/${doctorId}/${payment.patient._id}/Manage/devis`)
                      }}
                    >
                      {RegNo(payment.patient.RegNo)}
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
                      {payment.type}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                      {payment.amount}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                      {payment.doctor.username}
                      {/* {selectedInvoice.doctor[0].username} */}
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
