import { createContext } from "react"
import { DefaultUserInterface, UserInterface } from "../../users/types"

export interface laboratoryInterface {
  _id: string,
  name: string,
  phone: string,
  accounts?: [],
  treatments?: [],
  payments?: [],
  consumptions?: [],
  patients?: []
}

export const DefaultLaboratoryInterface  = {
  _id: "",
  name: "",
  phone: "",
}

export interface DataLaboratoryInterface {
  name: string, 
  setName: (name: string) => void,
  phone: string,
  setPhone: (phone: string) => void
}

const defaultDataLaboratoryInterface:DataLaboratoryInterface = {
  name: "", 
  setName: () => {},
  phone: "",
  setPhone: () => {}
}

export const DataLaboratoryContext = createContext(defaultDataLaboratoryInterface)


export interface ShowLaboratoryInterface {
  showSuccessMsg: boolean,
  setShowSuccessMsg: (showSuccessMsg: boolean) => void,
  showEditModal: boolean,
  setShowEditModal: (showEditModal: boolean) => void,
  showDeleteModal: boolean,
  setShowDeleteModal: (showDeleteModal: boolean) => void,
  selectedLaboratory: laboratoryInterface,
  setSelectedLaboratory: (selectedLaboratory: laboratoryInterface) => void,
  selectedActionLab: string,
  setSelectedActionLab: (selectedActionLab: string) => void,
  selectedDoctorLab: UserInterface, 
  setSelectedDoctorLab: (selectedDoctorLab: UserInterface) => void
}

export const DefaultShowLaboratoryInterface: ShowLaboratoryInterface = {
  showSuccessMsg: false,
  setShowSuccessMsg: () => {},
  showEditModal: false,
  setShowEditModal: () => {},
  showDeleteModal: false,
  setShowDeleteModal: () => {},
  selectedLaboratory: DefaultLaboratoryInterface,
  setSelectedLaboratory: () => {},
  selectedActionLab: "",
  setSelectedActionLab: () => {},
  selectedDoctorLab: DefaultUserInterface, 
  setSelectedDoctorLab: () => {}
}

