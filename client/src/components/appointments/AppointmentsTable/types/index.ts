import { createContext } from "react"
import { DayInfo, DefaultDayInfo } from "../../ConfigAppointment/DayOfWork/types"
import { DefaultUserInterface, UserInterface } from "../../../users/types"
import { DefaultPatientInterface, PatientInterface } from "../../../patients/types"

export interface AppointmentTableInterface {
  Days: DayInfo[],
  setDays: (Days: DayInfo[]) => void,
  desiredDate: Date,
  setDesiredDate: (desiredDate: Date) => void,
}

export const DefaultAppointmentTableInterface: AppointmentTableInterface = {
  Days: [DefaultDayInfo],
  setDays: () => {},
  desiredDate: new Date(),
  setDesiredDate: () => {},
}

export const AppointmentTableContext = createContext(DefaultAppointmentTableInterface)

export interface AppointmentInterface {
  _id: string,
  doctor: UserInterface,
  patient: PatientInterface,
  date: string,
  time: string,
  numSeance: number,
  partOfTime: string
}

export const DefaultAppointmentInterface:AppointmentInterface = {
  _id: "",
  doctor: DefaultUserInterface,
  patient: DefaultPatientInterface,
  date: new Date().toISOString(),
  time: "",
  numSeance: 0,
  partOfTime: ""
}

