import { createContext } from "react"

export interface ShowAppointmentInterface {
  showSuccessMsg: boolean, 
  setShowSuccessMsg: (showSuccessMsg: boolean) => void,
  showAddModal: boolean,
  setShowAddModal: (showAddModal: boolean) => void,
  selectedTd: any,
  setSelectedTd: (selectedTd: any) => void,
  showDeleteModal: boolean,
  setShowDeleteModal: (showDeleteModal: boolean) => void,
  selectedAppointment: any,
  setSelectedAppointment: (selectedAppointment: any) => void,
  filterByDate: Date,
  setFilterByDate: (filterByDate: Date) => void
}

export const DefaultShowAppointmentInterface: ShowAppointmentInterface = {
  showSuccessMsg: false, 
  setShowSuccessMsg: () => {},
  showAddModal: false,
  setShowAddModal: () => {},
  selectedTd: {},
  setSelectedTd: () => {},
  showDeleteModal: false,
  setShowDeleteModal: () => {},
  selectedAppointment: {},
  setSelectedAppointment: () => {},
  filterByDate: new Date(),
  setFilterByDate: () => {},
}

export const ShowAppointmentContext = createContext(DefaultShowAppointmentInterface)
