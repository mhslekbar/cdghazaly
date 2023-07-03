import React, { useContext, useState } from "react";
import { DataDayOfWorkContext, DayInfo, DefaultDayInfo } from "../types";

const InputsDayOfWork: React.FC = () => {
  const { DayArray } = useContext(DataDayOfWorkContext);
  const [selectedDay, setSelectedDay] = useState<DayInfo[]>([DefaultDayInfo]);

  const handleAddDay = (e: any, arr: any) => {
    if (!e.target.checked) {
      setSelectedDay(selectedDay.filter((data) => data.order !== arr.order));
    } else {
      setSelectedDay([...selectedDay, arr]);
    }
  };

  return (
    <>
      {DayArray.map((arr: any) => (
        <div className="block" key={arr.order}>
          {}
          <input
            type="checkbox"
            name={arr.name}
            id={`day-${arr.order}`}
            checked={selectedDay.some((day) => day.order === arr.order)}
            onChange={(e) => handleAddDay(e, arr)}
          />
          <label
            htmlFor={`day-${arr.order}`}
            className={`text-gray-700 font-bold w-fit ml-1`}
          >
            {arr.name}
          </label>
        </div>
      ))}
    </>
  );
};

export default InputsDayOfWork;
