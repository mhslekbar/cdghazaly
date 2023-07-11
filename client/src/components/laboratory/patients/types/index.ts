import { createContext } from "react"
import { AppointmentInterface, DefaultAppointmentInterface } from "../../../appointments/AppointmentsTable/types"
import { DefaultPatientInterface, PatientInterface } from "../../../patients/types"
import { DefaultLabConsumptionInterface, LabConsumptionInterface } from "../../consumptions/types"

export interface PatientLab {
  _id: string,
  patient: PatientInterface,
  consumptionLab: LabConsumptionInterface,
  appointment: AppointmentInterface,
  fingerPrintDate: Date,
  finish: boolean,
  createdAt: Date,
  updatedAt: Date,
}

export const DefaultPatientLab: PatientLab = {
  _id: "",
  patient: DefaultPatientInterface,
  consumptionLab: DefaultLabConsumptionInterface,
  appointment: DefaultAppointmentInterface,
  fingerPrintDate: new Date(),
  finish: false,
  createdAt: new Date(),
  updatedAt: new Date(),
}

export interface ShowPatientLabInterface {
  selectedPatientLab: PatientLab,
  setSelectedPatientLab: (selectedPatientLab: PatientLab) => void,
  typePatientLab: boolean,
  setTypePatientLab: (typePatientLab: boolean) => void,
  showFinishPatientLab: boolean,
  setShowFinishPatientLab: (showFinishPatientLab: boolean) => void,
  showAppointmentModal: boolean,
  setShowAppointmentModal: (showAppointmentModal: boolean) => void,
}

export const DefaultShowPatientLabInterface: ShowPatientLabInterface = {
  selectedPatientLab: DefaultPatientLab,
  setSelectedPatientLab: () => {},
  typePatientLab: false,
  setTypePatientLab: () => {},
  showFinishPatientLab: false,
  setShowFinishPatientLab: () => {},
  showAppointmentModal: false,
  setShowAppointmentModal: () => {},
}

export const ShowPatientLabContext = createContext(DefaultShowPatientLabInterface)
