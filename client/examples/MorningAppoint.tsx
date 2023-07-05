// import React, { useContext } from "react";
// import { SetAppointmentInterface } from "../ConfigAppointment/setAppointments/types";
// import { AppointmentInterface, AppointmentTableContext } from "./types";
// import { DayInfo } from "../ConfigAppointment/DayOfWork/types";
// import { AddPlayTime, MultiplyTime, dateIsEqualToCurrentDate, getDateOfSpecificDay } from "../functions";
// import { ShowAppointmentContext } from "../types";
// import { formatDate } from "../../../functions/functions";
// import { useSelector } from "react-redux";
// import { State } from "../../../redux/store";
// import { useParams } from "react-router";
// import { MdRemoveCircleOutline } from "react-icons/md";

// interface MorningAppointInterface {
//   setAppoint: (partOfTime: string) => SetAppointmentInterface;
// }

// const MorningAppoint: React.FC<MorningAppointInterface> = ({ setAppoint }) => {
//   const { Days } = useContext(AppointmentTableContext);
//   const { setShowAddModal, setSelectedTd, setShowDeleteModal, setSelectedAppointment } = useContext(ShowAppointmentContext)
//   const { appointments } = useSelector((state: State) => state.appointments)
//   const { doctorId } = useParams()
//   const partOfTime = "matin"
//   return (
//     <>
//       {Array.from({ length: setAppoint(partOfTime)?.countSeance || 0 }).map(
//         (_, index) => {
//           const Start = setAppoint(partOfTime).start;
//           const time = setAppoint(partOfTime).time;
//           return (
//             <tr className="text-center border-b" key={index}>
//               {Days.sort((a: DayInfo, b: DayInfo) => a.order - b.order).map(
//                 (day: DayInfo) => {
//                   const tdTime = AddPlayTime(Start, MultiplyTime(time, index+1))
//                   const findDate = appointments.find((appoint: AppointmentInterface) => appoint.doctor._id === doctorId && formatDate(appoint.date.toString()) === formatDate(getDateOfSpecificDay(day.order + 1)) && appoint.partOfTime === partOfTime && appoint.numSeance === (index + 1))
                   
//                   return findDate ? 
//                     <td className={`${dateIsEqualToCurrentDate(day.order + 1)
//                           ? "bg-main"
//                           : ""
//                       } bg-yellow-light whitespace-nowrap py-4 border-r font-medium relative`}
//                       key={day.order}
//                     >
//                       <MdRemoveCircleOutline onClick={() => {
//                         setShowDeleteModal(true)
//                         setSelectedAppointment(findDate)  
//                       }} className="text-red absolute top-2 right-2" style={{ fontSize: "16px" }} />
//                       <span className="block">{findDate.patient.name}</span>
//                       <span className="block">{findDate.patient.contact?.phone}</span>
//                       <span className="block">{tdTime}</span>
//                     </td>
//                   :(
//                     <td className={`bg-white ${dateIsEqualToCurrentDate(day.order + 1)
//                           ? "bg-main text-white"
//                           : ""
//                       } whitespace-nowrap px-6 py-4 border-r font-medium`}
//                       key={day.order}
//                       onClick={() => {
//                         setShowAddModal(true)
//                         setSelectedTd({ time: tdTime, numSeance: (index + 1), date: getDateOfSpecificDay(day.order + 1), partOfTime })
//                       }}
//                     >
//                       {tdTime}
//                     </td>
//                   );
//                 }
//               )}
//             </tr>                
//           );
//         }
//         )}
//     </>
//   );
// };

// export default MorningAppoint;

//   // {/* <td className="">
//   //   Mardi {index + 1}
//   // </td>
//   // <td className="whitespace-nowrap px-6 py-4 bg-white border-r font-medium">
//   //   Lundi {index + 1}
//   // </td>
//   // <td className="whitespace-nowrap px-6 py-4 bg-white border-r font-medium">
//   //   Mercredi {index + 1}
//   // </td>
//   // <td className="whitespace-nowrap px-6 py-4 bg-white border-r font-medium">
//   //   Jeudi {index + 1}
//   // </td>
//   // <td className="whitespace-nowrap px-6 py-4 bg-white border-r font-medium">
//   //   Vendredi {index + 1}
//   // </td>
//   // <td className="whitespace-nowrap px-6 py-4 bg-white border-r font-medium">
//   //   Samedi {index + 1}
//   // </td> */}



// //   ${dateIsEqualToCurrentDate(day.order + 1)
// //     ? "bg-main text-white"
// //     : "text-black"
// // } 

//   // {/* {day.name}
//   // <span className={`block`}>
//   //   {formatDate(getDateOfSpecificDay(day.order + 1))}
//   // </span> */}
