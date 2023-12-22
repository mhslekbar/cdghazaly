import { createContext } from "react"
import {  DefaultInvoicesAssuranceInterface, InvoicesAssuranceInterface } from "../../types";

export interface ShowPatientsAssuranceInterface {
  selectedInvoice: InvoicesAssuranceInterface,
  setSelectedInvoice: (selectedInvoice: InvoicesAssuranceInterface) => void,
  showDeleteInvoice: boolean,
  setShowDeleteInvoice: (showDeleteInvoice: boolean) => void,
  factureGlobal: boolean,
  setFactureGlobal: (factureGlobal: boolean) => void,
  showPayInvoice: boolean,
  setShowPayInvoice: (showPayInvoice: boolean) => void,
  showPrintModal: boolean, setShowPrintModal: (showPrintModal: boolean) => void,
  selectedPatient: any, setSelectedPatient: (selectedPatient: any) => void,
  invoiceType: string, setInvoiceType: (invoiceType: string) => void,
  patientAssRef: any,
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
  showPrintModal: false, setShowPrintModal: () => {},
  selectedPatient: null, setSelectedPatient: () => {},
  invoiceType: "", setInvoiceType: () => {},
  patientAssRef: null
}

export const ShowPatientsAssuranceContext = createContext(DefaultShowPatientsAssuranceInterface)
