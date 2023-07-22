// import { DefaultLaboratoryInterface, laboratoryInterface } from "../../types"
import { DefaultPatientInterface, PatientInterface } from "../../../patients/types"
import { DefaultTreatmentType, TreatmentType } from "../../../treatments/types"
import { DefaultUserInterface, UserInterface } from "../../../users/types"

export interface LabConsumptionInterface {
  _id: string,
  // laboratory: laboratoryInterface,
  doctor: UserInterface,
  patient: PatientInterface,
  treatment: TreatmentType,
  price: number,
  teeth: {
    nums: string[],
    surface: string
  }
  createdAt: string,
  updatedAt: string
}

export const DefaultLabConsumptionInterface: LabConsumptionInterface = {
  _id: "",
  // laboratory: DefaultLaboratoryInterface,
  doctor: DefaultUserInterface,
  patient: DefaultPatientInterface,
  treatment: DefaultTreatmentType,
  price: 0,
  teeth: {
    nums: [""],
    surface: ""
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}