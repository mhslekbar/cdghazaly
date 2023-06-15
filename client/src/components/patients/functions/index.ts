import { PatientTypePath } from "../../sidebar/types"
import { PatientInterface } from "../types"

export const switchTypePatient = (type: any, patient: PatientInterface) => {
  switch(type.path) {
    case "archive" :
      return patient.archive 
    case "notArchive" : 
      return !patient.archive
    case "patients" :
      return patient.RegNo && !patient.finish 
    case "ptInCommon" :
      return patient.RegNo && patient?.doctor.length > 1 
    case "debiteur" :
      return patient.finish && patient.balance < 0 
    case "regulariser" :
      return patient.finish &&  patient.balance === 0 
    case "creancier" :
      return patient.finish && patient.balance > 0 
    default: 
      return patient.RegNo
  }
}

export const switchPathPatient = (ptType: any, patient: PatientInterface) => {
  switch(ptType){
    case PatientTypePath.CONSULTATION :
      return !patient.RegNo
    case PatientTypePath.FINISH :
      return patient.finish
    case PatientTypePath.CURRENT :
      return patient.RegNo
    default: 
      return patient.RegNo
  }
}
