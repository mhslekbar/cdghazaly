import React, { useEffect, useState } from 'react'
import TypeStatistics from './TypeStatistics'
import { ShowStatisticContext } from './types'
import { useParams } from 'react-router'
import { get } from '../../requestMethods'
import { DefaultUserInterface, UserInterface } from '../users/types'

const ShowStatistics:React.FC = () => {
  const [selectedStats, setSelectedStats] = useState<string>("")
  const [showSwitchDate, setShowSwitchDate] = useState(false)
  
  const [sumTotalAmount, setSumTotalAmount] = useState<number>(0)
  const [sumConsoLab, setSumConsoLab] = useState<number>(0)

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1))) // tomorrow

  const [day, setDay] = useState(new Date().getDate())  
  const [month, setMonth] = useState(new Date().getMonth() + 1)  
  const [year, setYears] = useState(new Date().getFullYear())  

  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [userData, setUserData] = useState<UserInterface>(DefaultUserInterface)
  
  const { doctorId } = useParams()

  useEffect(() => {
    const createDate = new Date()
    day.toString() !== "jour" && createDate.setDate(day)
    month.toString() !== "mois" && createDate.setMonth(month - 1)
    createDate.setFullYear(year)
    setSelectedDate(createDate)
  }, [day, month, year])
  
  useEffect(() => {
    const fetchUserData = async () => {
      const response = await get(`user/specificUser?userId=${doctorId}`)
      const resData  = response.data.success
      console.log("resData: ", resData)
      if(resData) {
        setUserData(resData)
      }
    }
    fetchUserData()
  }, [doctorId])

  return (
    <ShowStatisticContext.Provider value={{
      selectedStats, setSelectedStats,
      day, setDay,
      month, setMonth,
      year, setYears,
      selectedDate, setSelectedDate,
      showSwitchDate, setShowSwitchDate,
      startDate, setStartDate,
      endDate, setEndDate,
      sumTotalAmount, setSumTotalAmount,
      sumConsoLab, setSumConsoLab,
      userData, setUserData
    }}>
      <TypeStatistics />
    </ShowStatisticContext.Provider>
  )
}

export default ShowStatistics
