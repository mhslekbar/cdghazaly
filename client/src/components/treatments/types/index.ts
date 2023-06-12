import { createContext } from "react"

export interface careTypeInterface {
  type: string,
  name: string
}
export const defaultcareTypeInterface = {
  type: "soins",
  name: "Soins"
}

export interface DataTreatmentInterface {
  treatment: string, 
  setTreatment: (treatment: string) => void
  price: string,
  setPrice: (price: string) => void,
  treatmentType: careTypeInterface,
  setTreatmentType: (treatmentType: careTypeInterface) => void,
}

export const defaultDataTreatmentInterface:DataTreatmentInterface = {
  treatment: "",
  setTreatment: () => {},
  price: "",
  setPrice: () => {},
  treatmentType: defaultcareTypeInterface,
  setTreatmentType: () => {},
}

export const DataTreatmentContext = createContext(defaultDataTreatmentInterface)

export type TreatmentType = {
  _id: string,
  name: string,
  type: string,
  price: string
}

export const DefaultTreatmentType = {
  _id: "",
  name: "",
  type: "",
  price: ""
}

