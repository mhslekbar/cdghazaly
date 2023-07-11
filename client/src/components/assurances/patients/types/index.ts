import { createContext } from "react"
import {  DefaultInvoicesAssuranceInterface, InvoicesAssuranceInterface } from "../../types"

export interface ShowPatientsAssuranceInterface {
  selectedInvoice: InvoicesAssuranceInterface,
  setSelectedInvoice: (selectedInvoice: InvoicesAssuranceInterface) => void,
  showDeleteInvoice: boolean,
  setShowDeleteInvoice: (showDeleteInvoice: boolean) => void,
  factureGlobal: boolean,
  setFactureGlobal: (factureGlobal: boolean) => void,
}

export const  DefaultShowPatientsAssuranceInterface: ShowPatientsAssuranceInterface = {
  selectedInvoice: DefaultInvoicesAssuranceInterface,
  setSelectedInvoice: () => {},
  showDeleteInvoice: false,
  setShowDeleteInvoice: () => {},
  factureGlobal: false,
  setFactureGlobal: () => {},
}

export const ShowPatientsAssuranceContext = createContext(DefaultShowPatientsAssuranceInterface)
