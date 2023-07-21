import React, { useContext } from "react";
import { SetAppointmentInterface } from "../ConfigAppointment/setAppointments/types";
import { AppointmentTableContext } from "./types";
import { DayInfo } from "../ConfigAppointment/DayOfWork/types";
import TdTable from "./Table/TdTable";

interface DataAppointmentInterface {
  setAppoint: (partOfTime: string) => SetAppointmentInterface;
  partOfTime: string
}

const DataAppointment: React.FC<DataAppointmentInterface> = ({ setAppoint, partOfTime }) => {
  const { Days } = useContext(AppointmentTableContext);

  return (
    <>
      {Array.from({ length: setAppoint(partOfTime)?.countSeance || 0 }).map(
        (_, index) => {
          const Start = setAppoint(partOfTime).start;
          const time = setAppoint(partOfTime).time;
          return (
            <tr className="text-center border-b" key={index}>
              {Days.slice().sort((a: DayInfo, b: DayInfo) => a.order - b.order).map(
                (day: DayInfo) => {
                  return <React.Fragment key={day.order}>
                    <TdTable Start={Start} time={time} index={index} day={day} partOfTime={partOfTime} />
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

