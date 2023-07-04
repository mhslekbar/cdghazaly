import React, { useEffect, useState } from "react";
import {
  DefaultSetAppointmentInterface,
  SetAppointmentInterface,
} from "./types";
import { useParams } from "react-router";
import EditSetAppointment from "./EditSetAppointment";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { State } from "../../../../redux/store";
import { useDispatch } from "react-redux";
import { ShowSetAppointApi } from "../../../../redux/setAppoint/setAppointApiCalls";

const ShowSetAppointment: React.FC = () => {
  const { setAppointment } = useSelector((state: State) => state.setAppointment);
  const [showEditSetAppoint, setShowEditSetAppoint] = useState(false)
  const [selectedSetAppoint, setSelectedSetAppoint] = useState<SetAppointmentInterface>(DefaultSetAppointmentInterface)
  const { doctorId } = useParams();
  const dispatch: any = useDispatch()

  useEffect(() => {
    const fetchSetAppointment = async () => {
      await dispatch(ShowSetAppointApi(doctorId))
    };
    fetchSetAppointment();
  }, [dispatch, doctorId]);

  return (
    <>
    {showEditSetAppoint && selectedSetAppoint && 
      <EditSetAppointment setAppointmentData={selectedSetAppoint} modal={showEditSetAppoint} toggle={() => setShowEditSetAppoint(!showEditSetAppoint)}/>
    }
      <div className="flex flex-col border mt-3">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light text-center">
                <thead className="border-b font-medium bg-main text-white">
                  <tr>
                    <th className="px-6 py-4 border-r">montée</th>
                    <th className="px-6 py-4 border-r">Descente</th>
                    <th className="px-6 py-4 border-r">Temps</th>
                    <th className="px-6 py-4 border-r">NBS.SN</th>
                    <th className="px-6 py-4 border-r">Type</th>
                    <th className="px-6 py-4 border-r">Control</th>
                  </tr>
                </thead>
                <tbody>
                  {setAppointment.map(
                    (setApp: SetAppointmentInterface, index) => (
                      <tr className="border-b" key={index}>
                        <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                          {setApp.start}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                          {setApp.end}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                          {setApp.time}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                          {setApp.countSeance}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                          {setApp.partOfTime}
                        </td>
                        <td className="flex justify-center px-4 py-2 border-r bg-white">
                          <FaEdit className="text-blue" style={{ fontSize: "22px" }} onClick={() => {
                            setSelectedSetAppoint(setApp)
                            setShowEditSetAppoint(true)
                          }}/>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowSetAppointment;
