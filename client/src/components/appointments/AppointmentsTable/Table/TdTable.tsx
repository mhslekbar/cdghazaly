import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AddPlayTime, MultiplyTime, getDateOfSpecificDay } from "../../functions";
import { formatDate } from "../../../../functions/functions";
import { DayInfo } from "../../ConfigAppointment/DayOfWork/types";
import TdCheckedAppoint from "./TdCheckedAppoint";
import TdNewAppoint from "./TdNewAppoint";
import { ShowAppointmentContext } from "../../types";

interface props {
  Start: string;
  time: string;
  index: number;
  day: DayInfo;
  partOfTime: string;
  appointments?: any[],
}

const TdTable: React.FC<props> = ({ Start, time, index, day, partOfTime, appointments }) => {
  const { doctorId } = useParams();
  const { filterByDate } = useContext(ShowAppointmentContext)
  const [desiredDate, setDesiredDate] = useState(new Date())
  
  useEffect(() => {
    setDesiredDate(filterByDate)
  }, [filterByDate])

  const tdTime = AddPlayTime(Start, MultiplyTime(time, index));

  let cellContent = null;
  if(appointments) {
    const findDate = appointments.find(
      (appoint: any) => {
        return appoint.doctor._id === doctorId &&
          formatDate(new Date(appoint.date).toString()) ===
          formatDate(getDateOfSpecificDay(day.order + 1, desiredDate)) &&
          appoint.partOfTime === partOfTime &&
          appoint.numSeance === index + 1
      }

    );

    if (findDate && findDate._id) {
      cellContent = <TdCheckedAppoint day={day} findDate={findDate} tdTime={tdTime} />;
    } else {
      cellContent = <TdNewAppoint day={day} tdTime={tdTime} index={index} partOfTime={partOfTime} />;
    }
  }

  return <>{cellContent}</>;

};

export default TdTable;
