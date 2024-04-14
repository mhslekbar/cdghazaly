import { createContext } from "react"
import { AssuranceInterface, DefaultAssuranceInterface } from "../../assurances/types"

export interface careTypeInterface {
  type: string,
  name: string
}
export const defaultcareTypeInterface = {
  type: "soins",
  name: "Soins"
}

export const ArrayTypeCare = [
  {type: "soins",   name:  "Soins"},
  {type: "prothese", name: "Prothese"},
  {type: "gencive",  name: "Soins gencive"},
  {type: "implant", name: "Implant"},
  {type: "pediatre", name: "Soins pediatre"},
  {type: "bouche",   name: "Soins de bouche"},
  {type: "conservative", name: "Conservateur"},
]

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
