import React, { useState } from 'react'
import { ShowAppointmentContext } from './types'
import HeaderAppointment from './HeaderAppointment'

const ShowAppointments:React.FC = () => {
  const [showSuccessMsg, setShowSuccessMsg] = useState(false)

  return (
    <ShowAppointmentContext.Provider value={{
      showSuccessMsg, setShowSuccessMsg
    }}>
      Hello From ShowAppointments
      <HeaderAppointment />
    </ShowAppointmentContext.Provider>
  )
}

export default ShowAppointments
