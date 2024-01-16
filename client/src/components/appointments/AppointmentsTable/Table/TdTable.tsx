import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { AddPlayTime, MultiplyTime,  getDateOfSpecificDay } from "../../functions";
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

  const tdTime = useMemo(() => AddPlayTime(Start, MultiplyTime(time, index)), [Start, time, index]);

  const cellContent = useMemo(() => {
    if(appointments) {
      const findDate = appointments.find(
        (appoint: any) =>
          appoint.doctor._id === doctorId &&
          formatDate(appoint.date.toString()) ===
          formatDate(getDateOfSpecificDay(day.order + 1, desiredDate)) &&
          appoint.partOfTime === partOfTime &&
          appoint.numSeance === index + 1
      );
      if (findDate && findDate._id) {
        return <TdCheckedAppoint day={day} findDate={findDate} tdTime={tdTime} />
      } else {
        return <TdNewAppoint day={day} tdTime={tdTime} index={index} partOfTime={partOfTime} />
      }
    }

  }, [appointments, doctorId, day, desiredDate, partOfTime, index, tdTime]);

  return <>{cellContent}</>;

};

export default TdTable;