import React, { createContext, useState } from 'react'
import ShowSetAppointment from './setAppointments/ShowSetAppointment'
import ShowDayOfWork from './DayOfWork/ShowDayOfWork'
import SuccessMsg from '../../../Messages/SuccessMsg'

interface ConfigAppointmentInterface {
  showSuccessMsg: boolean,
  setShowSuccessMsg: (showSuccessMsg: boolean) => void,
}

const DefaultConfigAppointmentInterface: ConfigAppointmentInterface = {
  showSuccessMsg: false,
  setShowSuccessMsg: () => {},
}

export const ConfigAppointmentContext = createContext(DefaultConfigAppointmentInterface)

const ConfigAppointment:React.FC = () => {
  const [showSuccessMsg, setShowSuccessMsg] = useState(false)
  return (
    <ConfigAppointmentContext.Provider value={{
      showSuccessMsg, setShowSuccessMsg
    }}>
      {showSuccessMsg && (
        <SuccessMsg
          modal={showSuccessMsg}
          toggle={() => setShowSuccessMsg(!showSuccessMsg)}
        />
      )}
      <ShowDayOfWork />
      <ShowSetAppointment />
    </ConfigAppointmentContext.Provider>
  )
}

export default ConfigAppointment
