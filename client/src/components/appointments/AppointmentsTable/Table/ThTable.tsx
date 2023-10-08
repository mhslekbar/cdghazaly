import React, { useContext, useEffect, useState } from 'react'
import { dateIsEqualToCurrentDate, getDateOfSpecificDay } from '../../functions'
import { formatDate } from '../../../../functions/functions'
import { DayInfo } from '../../ConfigAppointment/DayOfWork/types'
import { ShowAppointmentContext } from '../../types'

interface ThTableInterface {
  day: DayInfo
}

const ThTable:React.FC<ThTableInterface> = ({ day }) => {
  const { filterByDate } = useContext(ShowAppointmentContext)
  const [desiredDate, setDesiredDate] = useState(new Date())
  
  useEffect(() => {
    setDesiredDate(filterByDate)
  }, [filterByDate])
  
  return (
    <th className={`px-6 py-4 border-r ${dateIsEqualToCurrentDate(day.order + 1, desiredDate) ? "bg-main text-white":"" }`} key={day.order}>
    {day.name}
    <span className={`${dateIsEqualToCurrentDate(day.order + 1, desiredDate) ? "text-white":"" } block`} >
      {formatDate(getDateOfSpecificDay(day.order + 1, desiredDate))}
    </span>
  </th>
  )
}

export default ThTable
