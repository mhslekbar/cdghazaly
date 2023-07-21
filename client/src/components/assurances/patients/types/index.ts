import { createContext } from "react"
import {  DefaultInvoicesAssuranceInterface, InvoicesAssuranceInterface } from "../../types"

export interface ShowPatientsAssuranceInterface {
  selectedInvoice: InvoicesAssuranceInterface,
  setSelectedInvoice: (selectedInvoice: InvoicesAssuranceInterface) => void,
  showDeleteInvoice: boolean,
  setShowDeleteInvoice: (showDeleteInvoice: boolean) => void,
  factureGlobal: boolean,
  setFactureGlobal: (factureGlobal: boolean) => void,
  showPayInvoice: boolean,
  setShowPayInvoice: (showPayInvoice: boolean) => void,
}

export const  DefaultShowPatientsAssuranceInterface: ShowPatientsAssuranceInterface = {
  selectedInvoice: DefaultInvoicesAssuranceInterface,
  setSelectedInvoice: () => {},
  showDeleteInvoice: false,
  setShowDeleteInvoice: () => {},
  factureGlobal: false,
  setFactureGlobal: () => {},
  showPayInvoice: false,
  setShowPayInvoice: () => {},
}

export const ShowPatientsAssuranceContext = createContext(DefaultShowPatientsAssuranceInterface)
