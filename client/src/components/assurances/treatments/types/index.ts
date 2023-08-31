import { createContext } from "react"
import { AssuranceInterface, DefaultAssuranceInterface } from "../../types"


export interface DataTreatmentInterface {
  treatment: string, 
  setTreatment: (treatment: string) => void
  price: string,
  setPrice: (price: string) => void
}

export const defaultDataTreatmentInterface:DataTreatmentInterface = {
  treatment: "",
  setTreatment: () => {},
  price: "",
  setPrice: () => {},
}

export const DataTreatmentContext = createContext(defaultDataTreatmentInterface)

export type TreatmentType = {
  _id: string,
  name: string,
  type: string,
  price: string,
  assurance: AssuranceInterface
}

export const DefaultTreatmentType = {
  _id: "",
  name: "",
  type: "",
  price: "",
  assurance: DefaultAssuranceInterface
}

