import React, { useContext, useEffect, useState } from "react";
import { SetAppointmentInterface } from "../ConfigAppointment/setAppointments/types";
import { AppointmentTableContext } from "./types";
import { DayInfo } from "../ConfigAppointment/DayOfWork/types";
import TdTable from "./Table/TdTable";
import { State } from "../../../redux/store";
import { useSelector } from "react-redux";

interface props {
  setAppoint: (partOfTime: string) => SetAppointmentInterface;
  partOfTime: string
}

const DataAppointment: React.FC<props> = ({ setAppoint, partOfTime }) => {
  const { Days } = useContext(AppointmentTableContext);
  const { appointments } = useSelector((state: State) => state.appointments);
  
  const [daysAndAppointment, setDaysAndAppointment] = useState<DayInfo[]>([])

  useEffect(() => {
    setDaysAndAppointment(Days.map((day: DayInfo) => ({...day, appointments})))
  }, [Days, appointments])

  return (
    <>
      {Array.from({ length: setAppoint(partOfTime)?.countSeance || 0 }).map(
        (_, index) => {
          const Start = setAppoint(partOfTime).start;
          const time = setAppoint(partOfTime).time;
          return (
            <tr className="text-center border border-gray-950" key={index}>
              {daysAndAppointment
              .slice()
              .sort((a: DayInfo, b: DayInfo) => a.order - b.order)
              .map(
                (day: DayInfo) => {
                  return <React.Fragment key={day.order}>
                    <TdTable 
                      appointments={day.appointments} 
                      Start={Start} 
                      time={time} 
                      index={index}
                      day={day}
                      partOfTime={partOfTime} />
                  </React.Fragment>
                }
              )}
            </tr>                
          );
        }
        )}
    </>
  );
};

export default DataAppointment;

