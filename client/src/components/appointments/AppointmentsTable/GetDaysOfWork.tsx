import React from "react"; // useContext, 
import { DayInfo } from "../ConfigAppointment/DayOfWork/types";
import ThTable from "./Table/ThTable";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";


const GetDaysOfWork: React.FC = () => {
  const { daysOfWork } = useSelector((state: State) => state.daysOfWork)

  return (
    // bg-white text-main
    <thead className="border-b font-medium bg-blue-400 text-white text-center">
      <tr>
        {daysOfWork
        ?.dayOfWork
        ?.slice()
        ?.sort((a: DayInfo, b: DayInfo) => a.order - b.order)
        ?.map(
          (day: DayInfo) => {
            return <React.Fragment key={day.order}>
              <ThTable day={day}/>
            </React.Fragment>
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