import { createContext } from "react"
import { DefaultPatientInterface, PatientInterface } from "../../../patients/types"
import { DefaultTreatmentType, TreatmentType } from "../../../treatments/types"
import { DefaultUserInterface, UserInterface } from "../../../users/types"

export interface InvoicesInterface {
  _id: string,
  patient: PatientInterface,
  numInvoice: number,
  finish: boolean
  LineInvoice: [LineInvoiceInterface]
}

export interface LineInvoiceInterface {
  _id: string,
  doctor: UserInterface,
  treatment: TreatmentType
  devis: string,
  acte: string,
  price: number,
  teeth: {
    nums: string[],
    surface :string
  }
  createdAt: Date,
  updatedAt: Date
}

export const DefaultLineInvoiceInterface:LineInvoiceInterface = {
  _id: "",
  doctor: DefaultUserInterface,
  treatment: DefaultTreatmentType,
  devis: "",
  acte: "",
  price: 0,
  teeth: {
    nums: [""],
    surface:""
  },
  createdAt: new Date(),
  updatedAt: new Date()
}

export const DefaultInvoicesInterface:InvoicesInterface = {
  _id: "",
  patient: DefaultPatientInterface,
  numInvoice: 0,
  finish: false,
  LineInvoice: [DefaultLineInvoiceInterface]
}


export interface ShowInvoicesInterface  {
  selectedInvoice: InvoicesInterface, 
  setSelectedInvoice: (selectedInvoice: InvoicesInterface) => void
  showEditInvoice: boolean,
  setShowEditInvoice: (showEditInvoice: boolean) => void
  showDeleteInvoice: boolean,
  setShowDeleteInvoice: (showDeleteInvoice: boolean) => void
  showSuccessMsg: boolean,
  setShowSuccessMsg: (showSuccessMsg: boolean) => void,
  typeInvoice: string,
  setTypeInvoice: (typeInvoice: string) => void,
}

export const DefaultShowInvoicesInterface:ShowInvoicesInterface = {
  selectedInvoice: DefaultInvoicesInterface, 
  setSelectedInvoice: () => {},
  showEditInvoice: false,
  setShowEditInvoice: () => {},
  showDeleteInvoice: false,
  setShowDeleteInvoice: () => {},
  showSuccessMsg: false,
  setShowSuccessMsg: () => {},
  typeInvoice: "",
  setTypeInvoice: () => {},
}

export const ShowInvoicesContext = createContext(DefaultShowInvoicesInterface)

