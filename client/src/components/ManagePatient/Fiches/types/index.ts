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
  appointment: any,
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
  showDeleteAppointmentModal: boolean,
  setShowDeleteAppointmentModal: (showDeleteAppointmentModal: boolean) => void,
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
  showDeleteAppointmentModal: false,
  setShowDeleteAppointmentModal: () => {},
}

export const ShowFichesContext = createContext(DefaultShowFichesInterface)


export const compareByDateAppointment = (a: LineFicheInterface, b: LineFicheInterface) => {
  if (a.dateAppointment === null && b.dateAppointment === null) {
    return 0; // Both dates are null, they are considered equal.
  } else if (a.dateAppointment === null) {
    return 1; // Sort null dateAppointment after non-null dates.
  } else if (b.dateAppointment === null) {
    return -1; // Sort non-null dates before null dateAppointment.
  } else {
    // Parse the date strings into Date objects for comparison.
    const dateA = new Date(a.dateAppointment);
    const dateB = new Date(b.dateAppointment);
    
    // Compare the Date objects.
    if (dateA < dateB) return -1;
    if (dateA > dateB) return 1;
    return 0;
  }
}