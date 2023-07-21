import React, { useEffect, useState } from 'react'
import ShowAppointments from '../components/appointments/ShowAppointments'
import { useNavigate, useParams } from 'react-router'
import { DefaultUserInterface, UserInterface } from '../components/users/types'
import { useSelector } from 'react-redux'
import { State } from '../redux/store'
import { ShowUserApi } from '../redux/users/UserApiCalls'
import { useDispatch } from 'react-redux'
import { FaChevronCircleLeft } from 'react-icons/fa'

const Appointments:React.FC = () => {
  const { doctorId } = useParams()
  const [doctor, setDoctor] = useState<UserInterface>(DefaultUserInterface)
  const { users } = useSelector((state: State) => state.users)
  const dispatch: any = useDispatch()

  useEffect(() => {
    const fetchUsers = async () => {
      await dispatch(ShowUserApi())
    }
    fetchUsers()
  }, [dispatch])

  useEffect(() => {
    setDoctor(users.find((user: UserInterface) => user._id === doctorId) || DefaultUserInterface)
  }, [doctorId, users])

  const navigate = useNavigate()

  return (
    <div>
      <div className='flex justify-between'>
        <FaChevronCircleLeft style={{ fontSize: "30px" }} className="text-main" onClick={() => navigate("/")}/>
        <h1 className='text-center text-3xl text-gray-700'>Rendez-vous DR. {doctor.username}</h1>
        <span></span>
      </div>
      <ShowAppointments />
    </div>
  )
}

export default Appointments
