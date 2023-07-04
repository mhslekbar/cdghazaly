import React, { useEffect, useState } from 'react'
import AddDayOfWork from './AddDayOfWork'
import { FaChevronCircleLeft } from 'react-icons/fa'
import { FcCalendar } from "react-icons/fc"
import { useNavigate, useParams } from 'react-router'

import { DataDayOfWorkContext, DayInfo, DayofTheWeek } from './types'
import { get } from '../../../../requestMethods'
import { DefaultUserInterface, UserInterface } from '../../../users/types'


const ShowDayOfWork:React.FC = () => {
  const [DayArray, setDayArray] = useState<any[]>(Object.values(DayofTheWeek));
  const [day, setDay] = useState("")
  const [selectedDay, setSelectedDay] = useState<DayInfo[]>([]);

  const [showAddModal, setShowAddModal] = useState(false)

  const navigate = useNavigate()
  const { doctorId } = useParams()

  useEffect(() => {
    const fetchDays = async () => {
      const response = await get(`appointment/dayOfWork/${doctorId}`)
      const resData = response.data.success
      setSelectedDay(resData.dayOfWork)
    }
    fetchDays()
  }, [setSelectedDay, doctorId])

  const [doctor, setDoctor] = useState<UserInterface>(DefaultUserInterface)
  
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await get(`user?userId=${doctorId}`)
      const resData  = response.data.success
      if(resData) {
        setDoctor(resData)
      }
    }
    fetchUsers()
  }, [doctorId])


  return (
    <DataDayOfWorkContext.Provider value={{
      DayArray, setDayArray,
      day, setDay,
      selectedDay, setSelectedDay
    }}>
      <div className='flex justify-between gap-1'>
        <FaChevronCircleLeft
          className='text-main hover:text-white hover:bg-main hover:rounded-full' 
          style={{
            fontSize: "30px"
          }}
          onClick={() => navigate(-1)}
        />
        <span>doctor: {doctor.username}</span>
        <FcCalendar style={{ fontSize: "30px" }} onClick={() => setShowAddModal(!showAddModal)} />
      </div>
      <AddDayOfWork modal={showAddModal} toggle={() => setShowAddModal(!showAddModal)}/>
    </DataDayOfWorkContext.Provider>
  )
}

export default ShowDayOfWork
