import { createContext } from "react"
import {  DefaultInvoicesAssuranceInterface, InvoicesAssuranceInterface } from "../../types"
import { DefaultPaymentInterface, PaymentInterface } from "../../../ManagePatient/Payments/types"

export interface ShowPatientsAssuranceInterface {
  selectedInvoice: InvoicesAssuranceInterface,
  setSelectedInvoice: (selectedInvoice: InvoicesAssuranceInterface) => void,
  showDeleteInvoice: boolean,
  setShowDeleteInvoice: (showDeleteInvoice: boolean) => void,
  payments: PaymentInterface[], 
  setPayments: (payments: PaymentInterface[]) => void,
}

export const  DefaultShowPatientsAssuranceInterface: ShowPatientsAssuranceInterface = {
  selectedInvoice: DefaultInvoicesAssuranceInterface,
  setSelectedInvoice: () => {},
  showDeleteInvoice: false,
  setShowDeleteInvoice: () => {},
  payments: [DefaultPaymentInterface], 
  setPayments: () => {},
}

export const ShowPatientsAssuranceContext = createContext(DefaultShowPatientsAssuranceInterface)
