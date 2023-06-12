import { createContext } from "react"
import { DoctorType } from "../../users/types";

export interface ShowPatientsInterface {
  selectedFilter: any, 
  setSelectedFilter: (selectedFilter: any) => void
}

export const DefaultShowPatientsInterface: ShowPatientsInterface = {
  selectedFilter: {}, 
  setSelectedFilter: () => {}
}

export const ShowPatientsContext = createContext(DefaultShowPatientsInterface)

export interface PatientInterface {
  _id: string;
  doctor: DoctorType[];
  RegNo: number;
  name: string;
  phone: string;
  HealthCondition: string;
  dob: string;
  social: boolean;
  finish: boolean;
  balance: number;
  date_archive: Date;
  archive: boolean;
  createdAt: Date
}


// STart Add Patient

export interface DataInputsPatientInterface {
  name: string,
  setName: (name: string) => void
  phone: string,
  setPhone: (phone: string) => void
  whatsApp: string,
  setWhatsApp: (whatsApp: string) => void
  address: string,
  setAddress: (address: string) => void
  healthyCondition: string,
  setHealthyCondition: (healthyCondition: string) => void
  yearOfBirth: string,
  setYearOfBirth: (yearOfBirth: string) => void
  
}
export const DefaultDataInputsPatientInterface: DataInputsPatientInterface = {
  name: "",
  setName: () => {},
  phone: "",
  setPhone: () => {},
  whatsApp: "",
  setWhatsApp: () => {},
  address: "",
  setAddress: () => {},
  healthyCondition: "",
  setHealthyCondition: () => {},
  yearOfBirth: "",
  setYearOfBirth: () => {}
}

export const DefaultDataInputsPatientContext = createContext(DefaultDataInputsPatientInterface)

// End Add Patient