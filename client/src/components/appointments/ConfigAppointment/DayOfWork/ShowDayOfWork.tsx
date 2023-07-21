import React, { useEffect, useState } from 'react'
import AddDayOfWork from './AddDayOfWork'
import { FaChevronCircleLeft } from 'react-icons/fa'
import { FcCalendar } from "react-icons/fc"
import { useNavigate, useParams } from 'react-router'

import { DataDayOfWorkContext, DayInfo, DayofTheWeek } from './types'
import { DefaultUserInterface, UserInterface } from '../../../users/types'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { State } from '../../../../redux/store'
import { ShowUserApi } from '../../../../redux/users/UserApiCalls'

const ShowDayOfWork:React.FC = () => {
  const [DayArray, setDayArray] = useState<any[]>(Object.values(DayofTheWeek));
  const [day, setDay] = useState("")
  const [selectedDay, setSelectedDay] = useState<DayInfo[]>([]);
  
  const [showAddModal, setShowAddModal] = useState(false)

  const navigate = useNavigate()
  const { doctorId } = useParams()

  const dispatch: any = useDispatch()

  const [doctor, setDoctor] = useState<UserInterface>(DefaultUserInterface)
  const { users } = useSelector((state: State) => state.users)
  const { daysOfWork } = useSelector((state: State) => state.daysOfWork)

  useEffect(() => {
    const fetchUsers = async () => {
      await dispatch(ShowUserApi())
    }
    fetchUsers()
  }, [dispatch])

  useEffect(() => {
    setDoctor(users.find((user: UserInterface) => user._id === doctorId) || DefaultUserInterface)
  }, [doctorId, users])

  useEffect(() => {
    setSelectedDay(daysOfWork.dayOfWork)
  }, [daysOfWork])

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
