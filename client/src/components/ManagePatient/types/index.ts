import { createContext } from "react"

export interface ManagePatientInterface {
  selectedLink: string,
  setSelectedLink: (selectedLink: string) => void
}

export const DefaultManagePatientInterface: ManagePatientInterface = {
  selectedLink: "",
  setSelectedLink: () => {}
}

export const ManagePatientContext = createContext(DefaultManagePatientInterface)
