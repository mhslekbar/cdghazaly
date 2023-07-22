import { createContext } from "react"
import { DefaultUserInterface, UserInterface } from "../../../../users/types";
export interface DayInfo {
  _id?: string,
  name: string;
  order: number;
}
export const DefaultDayInfo: DayInfo = {
  _id: "",
  name: "",
  order: -1
}
export interface DayOfWorkInterface {
  _id: string,
  doctor: UserInterface,
  dayOfWork: DayInfo[],
  createdAt: string
}

export const DefaultDayOfWorkInterface: DayOfWorkInterface = {
  _id: "",
  doctor: DefaultUserInterface,
  dayOfWork: [DefaultDayInfo],
  createdAt: new Date().toISOString()
}



export interface DataDayOfWork {
  DayArray: any[], 
  setDayArray: (DayArray: any[]) => void,
  day: string, 
  setDay: (day: string) => void,
  selectedDay: DayInfo[],
  setSelectedDay: (selectedDay: DayInfo[]) => void,
}

export const DefaultDataDayOfWork: DataDayOfWork = {
  DayArray: [], 
  setDayArray: () => {},
  day: "", 
  setDay: () => {},
  selectedDay: [DefaultDayInfo],
  setSelectedDay: () => {},
}

export const DataDayOfWorkContext = createContext(DefaultDataDayOfWork)

export const DayofTheWeek: Record<string, DayInfo> = {
  Lundi: {
    name: "Lundi",
    order: 0
  },
  Mardi: {
    name: "Mardi",
    order: 1
  },
  Mercredi: {
    name: "Mercredi",
    order: 2
  },
  Jeudi: {
    name: "Jeudi",
    order: 3
  },
  Vendredi: {
    name: "Vendredi",
    order: 4
  },
  Samedi: {
    name: "Samedi",
    order: 5
  },
  Dimanche: {
    name: "Dimanche",
    order: 6
  }
};


