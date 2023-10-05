import React, { useEffect, useState } from 'react'
import TypeConsumable from './TypeConsumable'
import { ShowConsumableContext } from './types'
import SuccessMsg from '../../Messages/SuccessMsg'

const ShowConsumables:React.FC = () => {
  const [showSuccessMsg, setShowSuccessMsg] = useState(false)
  
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1))) // tomorrow

  const [day, setDay] = useState(new Date().getDate())  
  const [month, setMonth] = useState(new Date().getMonth() + 1)  
  const [year, setYear] = useState(new Date().getFullYear())  
  const [showSwitchDate, setShowSwitchDate] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  
  useEffect(() => {
    const createDate = new Date()
    day.toString() !== "jour" && createDate.setDate(day)
    month.toString() !== "mois" && createDate.setMonth(month - 1)
    createDate.setFullYear(year)
    setSelectedDate(createDate)
  }, [day, month, year])

  return (
    <ShowConsumableContext.Provider value={{ 
      showSuccessMsg, setShowSuccessMsg,
      startDate, setStartDate,
      endDate, setEndDate,
      day, setDay,
      month, setMonth,
      year, setYear,
      showSwitchDate, setShowSwitchDate,
      selectedDate, setSelectedDate,
     }}>
      {showSuccessMsg && <SuccessMsg modal={showSuccessMsg} toggle={() => setShowSuccessMsg(!showSuccessMsg)} />}
      <TypeConsumable />
    </ShowConsumableContext.Provider>
  )
}

export default ShowConsumables
