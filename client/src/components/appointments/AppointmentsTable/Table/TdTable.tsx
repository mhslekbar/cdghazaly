import React, { useContext, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../../redux/store";
import { useParams } from "react-router";
import { AddPlayTime, MultiplyTime,  getDateOfSpecificDay } from "../../functions";
import { AppointmentInterface, DefaultAppointmentInterface } from "../types";
import { formatDate } from "../../../../functions/functions";
import { DayInfo } from "../../ConfigAppointment/DayOfWork/types";
import TdCheckedAppoint from "./TdCheckedAppoint";
import TdNewAppoint from "./TdNewAppoint";
import { ShowAppointmentContext } from "../../types";

interface TdTableInterface {
  Start: string;
  time: string;
  index: number;
  day: DayInfo;
  partOfTime: string;
}

const TdTable: React.FC<TdTableInterface> = ({ Start, time, index, day, partOfTime }) => {
  const { appointments } = useSelector((state: State) => state.appointments);
  const { doctorId } = useParams();

  const { filterByDate } = useContext(ShowAppointmentContext)
  const [desiredDate, setDesiredDate] = useState(new Date())
  
  useEffect(() => {
    setDesiredDate(filterByDate)
  }, [filterByDate])

  const tdTime = AddPlayTime(Start, MultiplyTime(time, index));
  const findDate: AppointmentInterface = useMemo(() => {
    return appointments.find((appoint: AppointmentInterface) => appoint.doctor._id === doctorId && formatDate(appoint.date.toString()) === formatDate(getDateOfSpecificDay(day.order + 1, desiredDate)) && appoint.partOfTime === partOfTime && appoint.numSeance === (index + 1)) || DefaultAppointmentInterface
  }, [appointments, doctorId, day, desiredDate, partOfTime, index])

  return findDate._id ? 
      <TdCheckedAppoint day={day} findDate={findDate} tdTime={tdTime} />
    : 
      <TdNewAppoint day={day} tdTime={tdTime} index={index} partOfTime={partOfTime} />
};

export default TdTable;