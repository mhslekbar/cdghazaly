import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { ShowPatientLabApi } from "../../../redux/laboratory/patients/patientLabApiCalls"

const DataPatientLab:React.FC = () => {
  const { patientLab } = useSelector((state: State) => state.patientLab);
  const dispatch: any = useDispatch()
  const { labId } = useParams()
  
  useEffect(() => {
    const fetchPaymentLab = async () => {
      try {
        await dispatch(ShowPatientLabApi(labId || ""))
      } catch {}
    }
    fetchPaymentLab()
  }, [dispatch, labId])

  return (
    <div className="flex flex-col border mt-2">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium bg-main text-white">
                <tr>
                  <th className="px-6 py-4 border-r">Doss.NO</th>
                  <th className="px-6 py-4 border-r">Nom</th>
                  <th className="px-6 py-4 border-r">Traitement</th>
                  <th className="px-6 py-4 border-r">Dents</th>
                  <th className="px-6 py-4 border-r">Labo</th>
                  <th className="px-6 py-4 border-r">Date D'empreinte</th>
                  <th className="px-6 py-4 border-r">Date RDV</th>
                  <th className="px-6 py-4 border-r">Valider</th>
                </tr>
              </thead>
              <tbody>
                {patientLab.map((patient: any, index) => (
                  <tr className="border-b" key={index}>
                    <td className="whitespace-nowrap px-4 py-2 border-r font-medium">
                      {patient.name}
                    </td>
                    <td></td>
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

export default DataPatientLab;
