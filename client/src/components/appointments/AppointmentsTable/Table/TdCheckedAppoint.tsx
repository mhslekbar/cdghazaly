import React, { useContext, useEffect, useState } from 'react'
import { dateIsEqualToCurrentDate } from '../../functions';
import { DayInfo } from '../../ConfigAppointment/DayOfWork/types';
import { MdRemoveCircleOutline } from 'react-icons/md';
import { ShowAppointmentContext } from '../../types';

interface TdCheckedAppointInterface {
  day: DayInfo;
  findDate: any,
  tdTime: any
}

const TdCheckedAppoint:React.FC<TdCheckedAppointInterface> = ({ day, findDate, tdTime }) => {
  const { setShowDeleteModal, setSelectedAppointment, filterByDate } = useContext(ShowAppointmentContext);
  const [desiredDate, setDesiredDate] = useState(new Date())
  
  useEffect(() => {
    setDesiredDate(filterByDate)
  }, [filterByDate])
  
  return (
    <td className={`${dateIsEqualToCurrentDate(day.order + 1, desiredDate)
          ? "bg-main"
          : ""
      } bg-yellow-light whitespace-nowrap py-4 border-r font-medium relative`}
      key={day.order}
    >
      <MdRemoveCircleOutline
        onClick={() => {
          setShowDeleteModal(true);
          setSelectedAppointment(findDate);
        }}
        className="text-red absolute top-2 right-2"
        style={{ fontSize: "16px" }}
      />
      <span className="block">{findDate.patient.name}</span>
      <span className="block">{findDate.patient.contact?.phone}</span>
      <span className="block">{tdTime}</span>
    </td>
  )
}

export default TdCheckedAppoint