import React, { useContext, useEffect, useState } from 'react'
import { dateIsEqualToCurrentDate, getDateOfSpecificDay } from '../../functions';
import { DayInfo } from '../../ConfigAppointment/DayOfWork/types';
import { ShowAppointmentContext } from '../../types';

interface TdNewAppointInterface {
  day: DayInfo;
  tdTime: any,
  index: number,
  partOfTime: string
}

const TdNewAppoint:React.FC<TdNewAppointInterface> = ({ day, tdTime, index, partOfTime }) => {
  const { setShowAddModal, setSelectedTd, filterByDate } = useContext(ShowAppointmentContext);
  const [desiredDate, setDesiredDate] = useState(new Date())
  
  useEffect(() => {
    setDesiredDate(filterByDate)
  }, [filterByDate])
  
  return (
    <td className={`${dateIsEqualToCurrentDate(day.order + 1, desiredDate)
          ? "bg-main"
          : "bg-white"
        } whitespace-nowrap py-4 border-r font-medium relative`}
        key={day.order}
        onClick={() => {
          setShowAddModal(true);
          setSelectedTd({
            time: tdTime,
            numSeance: index + 1,
            date: getDateOfSpecificDay(day.order + 1,  desiredDate),
            partOfTime,
          });
        }}
        >
      {tdTime}
    </td>
  )
}

export default TdNewAppoint
