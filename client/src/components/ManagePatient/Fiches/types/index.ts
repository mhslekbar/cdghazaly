import { createContext } from "react"
import { DefaultPatientInterface, PatientInterface } from "../../../patients/types"
import { DefaultUserInterface, UserInterface } from "../../../users/types"
import { DefaultPaymentInterface, PaymentInterface } from "../../Payments/types"
import { DefaultLabConsumptionInterface, LabConsumptionInterface } from "../../../laboratory/consumptions/types"
import { DefaultLineInvoiceInterface, LineInvoiceInterface } from "../../Invoices/types"
import { DefaultLineDevisType, LineDevisType } from "../../Devis/types"


export interface FicheInterface {
  _id: string,
  patient: PatientInterface,
  numFiche: number,
  LineFiche: [LineFicheInterface]
}

export interface LineFicheInterface {
  _id: string,
  doctor: UserInterface,
  dateAppointment: string,
  acte: string,
  amount: number,
  finish: number,
  payment: PaymentInterface,
  consumptionLab: LabConsumptionInterface,
  lineInvoice: LineInvoiceInterface,
  appointment: string,
  createdAt: Date,
  updatedAt: Date
}

export const DefaultLineFicheInterface:LineFicheInterface = {
  _id: "",
  doctor: DefaultUserInterface,
  dateAppointment: "",
  acte: "",
  amount: 0,
  finish: 0,
  payment: DefaultPaymentInterface,
  consumptionLab: DefaultLabConsumptionInterface,
  lineInvoice: DefaultLineInvoiceInterface,
  appointment: "",
  createdAt: new Date(),
  updatedAt: new Date()
}

export const DefaultFicheInterface:FicheInterface = {
  _id: "",
  patient: DefaultPatientInterface,
  numFiche: 0,
  LineFiche: [DefaultLineFicheInterface]
}


export interface ShowFichesInterface {
  selectedFiche: FicheInterface,
  setSelectedFiche: (selectedFiche: FicheInterface) => void,
  showSuccessMsg: boolean,
  setShowSuccessMsg: (showSuccessMsg: boolean) => void,
  selectedLineDevis: LineDevisType,
  setSelectedLineDevis: (selectedLineDevis: LineDevisType) => void,
  selectedLineFiche: LineFicheInterface,
  setSelectedLineFiche: (selectedLineFiche: LineFicheInterface) => void,
  showDeleteLineFiche: boolean,
  setShowDeleteLineFiche: (showDeleteLineFiche: boolean) => void,
  showAppointmentModal: boolean,
  setShowAppointmentModal: (showAppointmentModal: boolean) => void,
}

export const DefaultShowFichesInterface: ShowFichesInterface = {
  selectedFiche: DefaultFicheInterface,
  setSelectedFiche: () => {},
  showSuccessMsg: false,
  setShowSuccessMsg: () => {},
  selectedLineDevis: DefaultLineDevisType,
  setSelectedLineDevis: () => {},
  selectedLineFiche: DefaultLineFicheInterface,
  setSelectedLineFiche: () => {},
  showDeleteLineFiche: false,
  setShowDeleteLineFiche: () => {},
  showAppointmentModal: false,
  setShowAppointmentModal: () => {},
}

export const ShowFichesContext = createContext(DefaultShowFichesInterface)
