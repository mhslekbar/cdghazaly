import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { ShowPatientLabApi } from "../../../redux/laboratory/patients/patientLabApiCalls"
import { PatientLab, ShowPatientLabContext } from "./types";
import { RegNo, formatDate } from "../../../functions/functions";
import { FaCheck } from "react-icons/fa";

const DataPatientLab:React.FC = () => {
  const { patientLab } = useSelector((state: State) => state.patientLab);
  const dispatch: any = useDispatch()
  const { labId, doctorId } = useParams()
  const { typePatientLab, showFinishPatientLab, setShowFinishPatientLab, setSelectedPatientLab, setShowAppointmentModal } = useContext(ShowPatientLabContext)
  
  useEffect(() => {
    const fetchPaymentLab = async () => {
      try {
        await dispatch(ShowPatientLabApi(labId || ""))
      } catch {}
    }
    fetchPaymentLab()
  }, [dispatch, labId])

  return (
    <div className="flex flex-col border mt-3">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full sm:px-6 lg:px-8 invoice">
          <div className="overflow-hidden">
            <table className="min-w-full text-sm font-light text-center">
              <thead className="border-b font-medium bg-main text-white">
                <tr>
                  <th className="p-3 border-r">Doss.NO</th>
                  <th className="p-3 border-r">Nom</th>
                  <th className="p-3 border-r">Traitement</th>
                  <th className="p-3 border-r">Dents</th>
                  <th className="p-3 border-r">Date D'empreinte</th>
                  <th className="p-3 border-r">Date RDV</th>
                  {!typePatientLab && <th className="px-6 py-4 border-r">Terminer</th>}
                </tr>
              </thead>
              <tbody>
                {patientLab
                .filter((patientLabo: PatientLab) => patientLabo.consumptionLab.doctor._id === doctorId && patientLabo.finish === typePatientLab)
                .sort(((a: PatientLab, b: PatientLab) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
                .map((patientLabo: PatientLab, index) => {
                  return (
                    <tr className="border-b" key={index}>
                      <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                        {RegNo(patientLabo.consumptionLab.patient?.RegNo)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                        {patientLabo.consumptionLab.patient.name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                        {patientLabo.consumptionLab.treatment.name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                        {patientLabo.consumptionLab.teeth.nums.map((num: string, ind) => num + (ind < patientLabo.consumptionLab.teeth.nums.length - 1 ? ", " : ""))}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                        {formatDate(patientLabo.fingerPrintDate?.toString())}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                        {!patientLabo.appointment?.date ? // this mean if patient doesn't finish
                          <button type='button' className='bg-blue-400 text-white px-4 py-2 rounded border w-full' onClick={() => {
                            setSelectedPatientLab(patientLabo)                          
                            setShowAppointmentModal(true)                          
                          }}
                          >RDV</button>
                          : 
                          formatDate(patientLabo.appointment?.date?.toString())}
                      </td>
                      {!typePatientLab && <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                        <p className="flex justify-center">
                          <FaCheck className="text-main" style={{ fontSize: "22px" }} onClick={() => {
                            setSelectedPatientLab(patientLabo)
                            setShowFinishPatientLab(!showFinishPatientLab)
                          }}/>
                        </p>
                      </td>}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataPatientLab;
