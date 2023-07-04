import { createContext } from "react"
import { DefaultUserInterface, UserInterface } from "../../../../users/types"

export interface SetAppointmentInterface {
  _id: string,
  doctor: UserInterface,
  start: string,
  end: string,
  time: string,
  countSeance: number,
  partOfTime: string
}

export const DefaultSetAppointmentInterface: SetAppointmentInterface = {
  _id: "",
  doctor: DefaultUserInterface,
  start: "",
  end: "",
  time: "",
  countSeance: 0,
  partOfTime: ""
}

export interface DataSetAppointmentInterface {
  startTime: string,
  setStartTime: (startTime: string) => void,
  endTime: string,
  setEndTime: (endTime: string) => void,
  countSeance: number,
  setCountSeance: (countSeance: number) => void,
}

export const DefaultDataSetAppointmentInterface: DataSetAppointmentInterface = {
  startTime: "",
  setStartTime: () => {},
  endTime: "",
  setEndTime: () => {},
  countSeance: 0,
  setCountSeance: () => {},
}

export const DataSetAppointmentContext = createContext(DefaultDataSetAppointmentInterface)