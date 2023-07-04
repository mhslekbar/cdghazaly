import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { get } from "../../../requestMethods";
import { DayInfo } from "../ConfigAppointment/DayOfWork/types";
import { formatDate } from "../../../functions/functions";
import { dateIsEqualToCurrentDate, getDateOfSpecificDay } from "../functions";
import { AppointmentTableContext } from "./types";

const GetDaysOfWork: React.FC = () => {
  const { doctorId } = useParams();
  const { Days, setDays } = useContext(AppointmentTableContext);
  // const currentDate = new Date()

  useEffect(() => {
    const fetchDays = async () => {
      const response = await get(`appointment/dayOfWork/${doctorId}`);
      setDays(response.data.success.dayOfWork);
    };
    fetchDays();
  }, [doctorId, setDays]);

  return (
    // bg-white text-main
    <thead className="border-b font-medium bg-blue-400 text-white text-center">
      <tr>
        {Days.sort((a: DayInfo, b: DayInfo) => a.order - b.order).map(
          (day: DayInfo) => {
            return (
              <th className={`px-6 py-4 border-r ${dateIsEqualToCurrentDate( day.order + 1) ? "bg-main text-white":"" }`} key={day.order}>
                {day.name}
                <span className={`${dateIsEqualToCurrentDate( day.order + 1) ? "bg-main text-white":"" } block`} >
                  {formatDate(getDateOfSpecificDay( day.order + 1))}
                </span>
              </th>
            );
          }
        )}
      </tr>
    </thead>
  );
};

export default GetDaysOfWork;

// const currentDate = new Date();
// let currentDayOfWeek = currentDate.getDay();
// let difference = desiredDayOfWeek - currentDayOfWeek;
// if (difference < 0) {
//   difference += 7;
// }
// const millisecondsToAdd = difference * 24 * 60 * 60 * 1000;
// return new Date(currentDate.getTime() + millisecondsToAdd).toString();