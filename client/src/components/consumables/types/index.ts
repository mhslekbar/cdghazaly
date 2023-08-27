import { createContext } from "react"
export interface ShowConsumableInterface {
  showSuccessMsg: boolean,
  setShowSuccessMsg: (showSuccessMsg: boolean) => void,
  day: number,
  setDay: (day: number) => void,
  month: number,
  setMonth: (month: number) => void,
  year: number,
  setYear: (year: number) => void,
  showSwitchDate: boolean,
  setShowSwitchDate: (showSwitchDate: boolean) => void,
  startDate: Date,
  setStartDate: (startDate: Date) => void,
  endDate: Date,
  setEndDate: (endDate: Date) => void,
  selectedDate: Date,
  setSelectedDate: (selectedDate: Date) => void,
}

export const DefaultShowConsumableInterface:ShowConsumableInterface = {
  showSuccessMsg: false,
  setShowSuccessMsg: () => {},
  day: 0,
  setDay: () => {},
  month: 0,
  setMonth: () => {},
  year: 0,
  setYear: () => {},
  showSwitchDate: false,
  setShowSwitchDate: () => {},
  startDate: new Date(),
  setStartDate: () => {},
  endDate: new Date(),
  setEndDate: () => {}, 
  selectedDate: new Date(),
  setSelectedDate: () => {},
}

export const ShowConsumableContext = createContext(DefaultShowConsumableInterface)
