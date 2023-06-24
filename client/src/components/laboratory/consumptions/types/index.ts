import { DefaultPatientInterface, PatientInterface } from "../../../patients/types"
import { DefaultTreatmentType, TreatmentType } from "../../../treatments/types"
import { DefaultUserInterface, UserInterface } from "../../../users/types"
import { DefaultLaboratoryInterface, laboratoryInterface } from "../../types"

export interface LabConsumptionInterface {
  laboratory: laboratoryInterface,
  doctor: UserInterface,
  patient: PatientInterface,
  treatment: TreatmentType,
  price: number,
  teeth: {
    nums: string[],
    surface: string
  }
}

export const DefaultLabConsumptionInterface:LabConsumptionInterface = {
  laboratory: DefaultLaboratoryInterface,
  doctor: DefaultUserInterface,
  patient: DefaultPatientInterface,
  treatment: DefaultTreatmentType,
  price: 0,
  teeth: {
    nums: [""],
    surface: ""
  }
}