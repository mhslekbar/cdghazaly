import React, { useEffect, useState } from "react";
import GetDaysOfWork from "./GetDaysOfWork";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";
import { DefaultSetAppointmentInterface, SetAppointmentInterface } from "../ConfigAppointment/setAppointments/types";
import { DayInfo } from "../ConfigAppointment/DayOfWork/types";
import { AppointmentTableContext } from "./types";
import DataAppointment from "./DataAppointment";

const AppointmentsTable: React.FC = () => {
  const { setAppointment } = useSelector((state: State) => state.setAppointment)
  const { doctorId } = useParams()
  const [Days, setDays] = useState<DayInfo[]>([]);
  const [desiredDate, setDesiredDate] = useState(new Date("04-07-2023"))

  const setAppoint = (partOfTime: string): SetAppointmentInterface => {
    return setAppointment.find((setApp: SetAppointmentInterface) => setApp.doctor._id === doctorId && setApp.partOfTime === partOfTime) || DefaultSetAppointmentInterface
  }

  const { daysOfWork } = useSelector((state: State) => state.daysOfWork)

  useEffect(() => {
    setDays(daysOfWork.dayOfWork)
  }, [daysOfWork])

  return (
    <AppointmentTableContext.Provider value={{
      Days, setDays,
      desiredDate, setDesiredDate
    }}>
    <div className="flex flex-col border mt-3">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full sm:px-6 lg:px-8 invoice">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <GetDaysOfWork />
              <tbody>
                <DataAppointment partOfTime="matin" setAppoint={setAppoint}/>
                <tr className="bg-blue-400 text-center w-full">
                  <td colSpan={Days.length} className="p-6 text-2xl font-bold text-white">Pause</td>
                </tr>
                <DataAppointment partOfTime="soir" setAppoint={setAppoint}/>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </AppointmentTableContext.Provider>
  );
};

export default AppointmentsTable;
