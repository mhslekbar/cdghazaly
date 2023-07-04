import React, { useContext } from "react";
import { SetAppointmentInterface } from "../ConfigAppointment/setAppointments/types";
import { AppointmentTableContext } from "./types";
import { DayInfo } from "../ConfigAppointment/DayOfWork/types";
import { AddPlayTime, MultiplyTime, dateIsEqualToCurrentDate } from "../functions";


interface MorningAppointInterface {
  setAppoint: (partOfTime: string) => SetAppointmentInterface;
}

const MorningAppoint: React.FC<MorningAppointInterface> = ({ setAppoint }) => {
  const { Days } = useContext(AppointmentTableContext);

  return (
    <>
      {Array.from({ length: setAppoint("matin")?.countSeance || 0 }).map(
        (_, index) => {
          const Start = setAppoint("matin").start;
          const time = setAppoint("matin").time;
          return (
            <tr className="text-center border-b" key={index}>
              {Days.sort((a: DayInfo, b: DayInfo) => a.order - b.order).map(
                (day: DayInfo) => {

                  const tdTime = AddPlayTime(Start, MultiplyTime(time, index+1))
                  return (
                    <td className={`px-6 py-4 border-r ${dateIsEqualToCurrentDate(day.order + 1)
                          ? "bg-main text-white"
                          : ""
                      } whitespace-nowrap px-6 py-4 bg-white border-r font-medium`}
                      key={day.order}
                    >
                      {/* {day.name}
                      <span className={`block`}>
                        {formatDate(getDateOfSpecificDay(day.order + 1))}
                      </span> */}
                      {tdTime}
                    </td>
                  );
                }
              )}
            </tr>
          );
        }
        )}
    </>
  );
};

export default MorningAppoint;

  // {/* <td className="">
  //   Mardi {index + 1}
  // </td>
  // <td className="whitespace-nowrap px-6 py-4 bg-white border-r font-medium">
  //   Lundi {index + 1}
  // </td>
  // <td className="whitespace-nowrap px-6 py-4 bg-white border-r font-medium">
  //   Mercredi {index + 1}
  // </td>
  // <td className="whitespace-nowrap px-6 py-4 bg-white border-r font-medium">
  //   Jeudi {index + 1}
  // </td>
  // <td className="whitespace-nowrap px-6 py-4 bg-white border-r font-medium">
  //   Vendredi {index + 1}
  // </td>
  // <td className="whitespace-nowrap px-6 py-4 bg-white border-r font-medium">
  //   Samedi {index + 1}
  // </td> */}



//   ${dateIsEqualToCurrentDate(day.order + 1)
//     ? "bg-main text-white"
//     : "text-black"
// } 