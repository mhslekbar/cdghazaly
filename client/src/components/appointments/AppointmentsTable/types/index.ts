import { createContext } from "react"
import { DayInfo, DefaultDayInfo } from "../../ConfigAppointment/DayOfWork/types"

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
