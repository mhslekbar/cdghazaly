import React, { useEffect, useState } from 'react'
import ShowAppointments from '../components/appointments/ShowAppointments'
import { useParams } from 'react-router'
import { get } from '../requestMethods'
import { DefaultUserInterface, UserInterface } from '../components/users/types'

const Appointments:React.FC = () => {
  const { doctorId } = useParams()
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
    <div>
      <h1 className='text-center text-3xl text-gray-700'>Rendez-vous DR. {doctor.username}</h1>
      <ShowAppointments />
    </div>
  )
}

export default Appointments
