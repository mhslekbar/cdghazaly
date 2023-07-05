import React, { useContext, useEffect, useState } from "react";
import { SetAppointmentInterface } from "../ConfigAppointment/setAppointments/types";
import { AppointmentInterface, AppointmentTableContext } from "./types";
import { DayInfo } from "../ConfigAppointment/DayOfWork/types";

import TdCheckedAppoint from "./Table/TdCheckedAppoint";
import TdNewAppoint from "./Table/TdNewAppoint";
import { AddPlayTime, MultiplyTime, getDateOfSpecificDay } from "../functions";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";
import { formatDate } from "../../../functions/functions";
import { ShowAppointmentContext } from "../types";

interface DataAppointmentInterface {
  setAppoint: (partOfTime: string) => SetAppointmentInterface;
  partOfTime: string
}

const DataAppointment: React.FC<DataAppointmentInterface> = ({ setAppoint, partOfTime }) => {
  const { Days } = useContext(AppointmentTableContext);
  const { doctorId } = useParams()
  const { appointments } = useSelector((state: State) => state.appointments);

  const { filterByDate } = useContext(ShowAppointmentContext)
  const [desiredDate, setDesiredDate] = useState(new Date())
  
  useEffect(() => {
    setDesiredDate(filterByDate)
  }, [filterByDate])

  return (
    <>
      {Array.from({ length: setAppoint(partOfTime)?.countSeance || 0 }).map(
        (_, index) => {
          const Start = setAppoint(partOfTime).start;
          const time = setAppoint(partOfTime).time;
          return (
            <tr className="text-center border-b" key={index}>
              {Days.sort((a: DayInfo, b: DayInfo) => a.order - b.order).map(
                (day: DayInfo) => {
                  const tdTime = AddPlayTime(Start, MultiplyTime(time, index));
                  const findDate = appointments.find((appoint: AppointmentInterface) => appoint.doctor._id === doctorId && formatDate(appoint.date.toString()) === formatDate(getDateOfSpecificDay(day.order + 1, desiredDate)) && appoint.partOfTime === partOfTime && appoint.numSeance === (index + 1))
                  return <React.Fragment key={day.order}>
                    {findDate ? 
                      <TdCheckedAppoint day={day} findDate={findDate} tdTime={tdTime} />
                    : 
                      <TdNewAppoint day={day} tdTime={tdTime} index={index} partOfTime={partOfTime} />}
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

