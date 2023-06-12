import { createContext } from "react"


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
  assurance: string
}

export const DefaultTreatmentType = {
  _id: "",
  name: "",
  type: "",
  price: "",
  assurance: ""
}

