import { createContext } from "react"
import { DefaultUserInterface, UserInterface } from "../../users/types"
// import { DefaultLabConsumptionInterface, LabConsumptionInterface } from "../consumptions/types"
import { DefaultTreatmentLabInterface, TreatmentLabInterface } from "../treatments/types"
import { DefaultPaymentLabType, PaymentLabType } from "../payments/types"
import { AccountsInterface, DefaultAccountsInterface } from "../accounts/types"

export interface laboratoryInterface {
  _id: string,
  name: string,
  phone: string,
  accounts: AccountsInterface[],
  treatments: TreatmentLabInterface[],
  payments: PaymentLabType[],
  consumptions?: [],
  patients?: [],
  createdAt: string,
  updatedAt: string
}

export const DefaultLaboratoryInterface: laboratoryInterface = {
  _id: "",
  name: "",
  phone: "",
  accounts: [DefaultAccountsInterface],
  treatments: [DefaultTreatmentLabInterface],
  payments: [DefaultPaymentLabType],
  // consumptions: [DefaultLabConsumptionInterface],
  createdAt: "",
  updatedAt: ""
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
  setSelectedDoctorLab: (selectedDoctorLab: UserInterface) => void,
  showAddModal: boolean,
  setShowAddModal: (showAddModal: boolean) => void,
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
  setSelectedDoctorLab: () => {},
  showAddModal: false,
  setShowAddModal: () => {},
}

