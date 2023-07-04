import { createContext } from "react"

export interface DayInfo {
  name: string;
  order: number;
}
export const DefaultDayInfo: DayInfo = {
  name: "",
  order: -1
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


