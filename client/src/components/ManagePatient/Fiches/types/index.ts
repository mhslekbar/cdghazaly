import { createContext } from "react"
import { DefaultPatientInterface, PatientInterface } from "../../../patients/types"
import { DefaultUserInterface, UserInterface } from "../../../users/types"
import { DefaultPaymentInterface, PaymentInterface } from "../../Payments/types"
import { DefaultLabConsumptionInterface } from "../../../laboratory/consumptions/types"
import { DefaultLineInvoiceInterface } from "../../Invoices/types"
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
  amount: string,
  finish: number,
  payment: PaymentInterface,
  consumptionLab: any
  lineInvoice: any,
  appointment: string,
  createdAt: Date,
  updatedAt: Date
}

export const DefaultLineFicheInterface:LineFicheInterface = {
  _id: "",
  doctor: DefaultUserInterface,
  dateAppointment: "",
  acte: "",
  amount: "",
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
  showEditFiche: boolean,
  setShowEditFiche: (showEditFiche: boolean) => void,
  showDeleteLineFiche: boolean,
  setShowDeleteLineFiche: (showDeleteLineFiche: boolean) => void,
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
  showEditFiche: false,
  setShowEditFiche: () => {},
  showDeleteLineFiche: false,
  setShowDeleteLineFiche: () => {},
}

export const ShowFichesContext = createContext(DefaultShowFichesInterface)