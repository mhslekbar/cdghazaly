import React from "react"; // useContext, 
import { DayInfo } from "../ConfigAppointment/DayOfWork/types";
import ThTable from "./Table/ThTable";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";


const GetDaysOfWork: React.FC = () => {
  const { daysOfWork } = useSelector((state: State) => state.daysOfWork)

  return (
    // bg-white text-main
    <thead>
      <tr className="border border-gray-950 font-medium bg-blue-400 text-white text-center">
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
