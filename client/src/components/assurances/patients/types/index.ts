import { createContext } from "react"
import {  DefaultInvoicesAssuranceInterface, InvoicesAssuranceInterface } from "../../types"
import { DefaultUserInterface, UserInterface } from "../../../users/types"

export interface ShowPatientsAssuranceInterface {
  selectedInvoice: InvoicesAssuranceInterface,
  setSelectedInvoice: (selectedInvoice: InvoicesAssuranceInterface) => void,
  showDeleteInvoice: boolean,
  setShowDeleteInvoice: (showDeleteInvoice: boolean) => void
}

export const  DefaultShowPatientsAssuranceInterface: ShowPatientsAssuranceInterface = {
  selectedInvoice: DefaultInvoicesAssuranceInterface,
  setSelectedInvoice: () => {},
  showDeleteInvoice: false,
  setShowDeleteInvoice: () => {}
}

export const ShowPatientsAssuranceContext = createContext(DefaultShowPatientsAssuranceInterface)


export interface DataInvoiceAssuranceInterface {
  inCommon: boolean, 
  setInCommon: (inCommon: boolean) => void,
  doctorInCommon: UserInterface[],
  setDoctorInCommon: (doctorInCommon: UserInterface[]) => void
}

export const DefaultDataInvoiceAssuranceInterface:DataInvoiceAssuranceInterface = {
  inCommon: false, 
  setInCommon: () => {},
  doctorInCommon: [DefaultUserInterface],
  setDoctorInCommon: () => {}
}

export const DataInvoiceAssuranceContext = createContext(DefaultDataInvoiceAssuranceInterface)

