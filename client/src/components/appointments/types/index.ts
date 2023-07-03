import { createContext } from "react"

export interface ShowAppointmentInterface {
  showSuccessMsg: boolean, 
  setShowSuccessMsg: (showSuccessMsg: boolean) => void,
}

export const DefaultShowAppointmentInterface: ShowAppointmentInterface = {
  showSuccessMsg: false, 
  setShowSuccessMsg: () => {},
}

export const ShowAppointmentContext = createContext(DefaultShowAppointmentInterface)
