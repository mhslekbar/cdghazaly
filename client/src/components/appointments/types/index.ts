import { createContext } from "react"

export interface ShowAppointmentInterface {
  showSuccessMsg: boolean, 
  setShowSuccessMsg: (showSuccessMsg: boolean) => void,
  showAddModal: boolean,
  setShowAddModal: (showAddModal: boolean) => void,
}

export const DefaultShowAppointmentInterface: ShowAppointmentInterface = {
  showSuccessMsg: false, 
  setShowSuccessMsg: () => {},
  showAddModal: false,
  setShowAddModal: () => {},
}

export const ShowAppointmentContext = createContext(DefaultShowAppointmentInterface)
