import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { State } from "../../redux/store";
import { ImplantInterface, ShowImplantContext } from "./types";
import { formatDate, RegNo } from "../../functions/functions";
import { FaCheck } from "react-icons/fa";

const DataImplants: React.FC = () => {
  const { implants } = useSelector((state: State) => state.implants);
  const { setShowAppointmentModal, setImplantData, setShowFinishImplant, typeFilterImplant } = useContext(ShowImplantContext)
  
  return (
    <div className="flex flex-col border mt-4">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light border border-gray-700">
              <thead className="border-b border-gray-700 font-medium bg-main text-white text-center">
                <tr>
                  <th className="px-4 py-4 border-r border-gray-700">DOSS.No</th>
                  <th className="px-4 py-4 border-r border-gray-700">Nom</th>
                  <th className="px-4 py-4 border-r border-gray-700">Traitement</th>
                  <th className="px-4 py-4 border-r border-gray-700">Dents</th>
                  <th className="px-4 py-4 border-r border-gray-700">Date</th>
                  <th className="px-4 py-4 border-r border-gray-700">Date RDV</th>
                  {!typeFilterImplant && <>
                    <th className="px-4 py-4 border-r border-gray-700">Terminer</th>
                  </>}
                </tr>
              </thead>
              <tbody>
                {implants
                .filter((implant: ImplantInterface) => implant.isSetAppointment === typeFilterImplant)
                .map((implant: ImplantInterface, index) => (
                  <tr className="border-b border-gray-700" key={index}>
                    <td className="whitespace-nowrap px-2 py-2 border-r border-gray-700 bg-white font-medium">
                      {RegNo(implant.patient?.RegNo)}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 border-r border-gray-700 bg-white font-medium">
                      {implant.patient?.name}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 border-r border-gray-700 bg-white font-medium">
                      {implant.treatment?.name}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 border-r border-gray-700 bg-white font-medium text-center">
                      {implant.teeth?.nums.map((num: string, index) => num + (index < implant.teeth?.nums.length - 1 ? ", " : ""))}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 border-r border-gray-700 bg-white font-medium">
                      {formatDate(implant.createdAt)}
                      {/* {formatLongDate(new Date(new Date().setMonth(new Date(implant.updatedAt).getMonth() + 3)))} */}
                    </td>
                    {!typeFilterImplant ? <>
                      <td className="whitespace-nowrap px-2 py-2 border-r border-gray-700 bg-white font-medium">
                        <button
                          type="button"
                          className="bg-blue-400 text-white px-4 py-2 rounded border w-full"
                          onClick={() => {
                            setShowAppointmentModal(true);
                            setImplantData(implant)
                          }}
                        >
                          RDV
                        </button>
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 border-r border-gray-700 bg-white font-medium">
                        <p className="flex justify-center items-center">
                          {!implant.isSetAppointment ? 
                            <FaCheck
                              className="text-main"
                              style={{ fontSize: "22px" }}
                              onClick={() => {
                                setImplantData(implant);;
                                setShowFinishImplant(true);
                              }}
                            />
                            : "TERMINER"}
                        </p>
                      </td>
                    </> : 
                    
                    <td className="whitespace-nowrap px-2 py-2 border-r border-gray-700 bg-white font-medium">
                      {implant.appointment ? (formatDate(implant.appointment?.date) + "  " + implant.appointment?.time) : ""}
                    </td>
                    }
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

export default DataImplants;
