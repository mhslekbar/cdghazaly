import { createContext } from "react"
import { DefaultUserInterface, UserInterface } from "../../users/types";

export interface PatientInterface {
  _id: string;
  doctor: UserInterface[];
  RegNo: number;
  name: string;
  contact: {
    phone: string,
    whatsApp: string,
  };
  address: string;
  HealthCondition: string;
  dob: string;
  assurance: {
    society: string,
    professionalId: string,
    percentCovered: string
  },
  finish: boolean;
  balance: number;
  date_archive: string;
  archive: boolean;
  createdAt: string
}

export const DefaultPatientInterface: PatientInterface = {
  _id: "",
  doctor: [DefaultUserInterface],
  RegNo: 0,
  name: "",
  contact: {
    phone: "",
    whatsApp: "",
  },
  address: "",
  HealthCondition: "",
  dob: "",
  assurance: {
    society: "",
    professionalId: "",
    percentCovered: ""
  },
  finish: false,
  balance: 0,
  date_archive: new Date().toString(),
  archive: false,
  createdAt: new Date().toString()
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
  setYearOfBirth: (yearOfBirth: string) => void,
  consultation: boolean,
  setConsultation: (consultation: boolean) => void,
  doctor: UserInterface[],
  setDoctor: (doctor: UserInterface[]) => void,
  paymentMethod: string,
  setPaymentMethod: (paymentMethod: string) => void,
  showAssurance: boolean, 
  setShowAssurance: (showAssurance: boolean) => void,
  AssuranceCompany: string, 
  setAssuranceCompany: (AssuranceCompany: string) => void,
  RegNoProfessional: string, 
  setRegNoProfessional: (RegNoProfessional: string) => void,
  supported: string, 
  setSupported: (supported: string) => void,
  percentage: string, 
  setPercentage: (percentage: string) => void,
  selectedDoctor: UserInterface[], 
  setSelectedDoctor: (selectedDoctor: UserInterface[]) => void,
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
  setYearOfBirth: () => {},
  consultation: false,
  setConsultation: () => {},
  doctor: [DefaultUserInterface],
  setDoctor: () => {},
  paymentMethod: "",
  setPaymentMethod: () => {},
  showAssurance: false, 
  setShowAssurance: () => {},
  AssuranceCompany: "", 
  setAssuranceCompany: () => {},
  RegNoProfessional: "", 
  setRegNoProfessional: () => {},
  supported: "", 
  setSupported: () => {},
  percentage: "",
  setPercentage: () => {},
  selectedDoctor: [DefaultUserInterface], 
  setSelectedDoctor: () => {},
}

export const DefaultDataInputsPatientContext = createContext(DefaultDataInputsPatientInterface)

// End Add Patient

export type filterPatientType = {
  type: string,
  value: string
}

export const DefaultFilterPatientType: filterPatientType = {
  type: "",
  value: ""
}

export interface ShowPatientsInterface {
  selectedPatient: PatientInterface,
  setSelectedPatient: (selectedPatient: PatientInterface) => void,
  selectedFilter: any, 
  setSelectedFilter: (selectedFilter: any) => void,
  showSuccessMsg: boolean,
  setShowSuccessMsg: (showSuccessMsg: boolean) => void,
  showEditPatient: boolean,
  setShowEditPatient: (showEditPatient: boolean) => void,
  showDeletePatient: boolean,
  setShowDeletePatient: (showDeletePatient: boolean) => void,
  showPassPatient: boolean,
  setShowPassPatient: (showPassPatient: boolean) => void,
  showFinishPatient: boolean,
  setShowFinishPatient: (showFinishPatient: boolean) => void,
  showReturnPatient: boolean,
  setShowReturnPatient: (showReturnPatient: boolean) => void,
  filterPatient: filterPatientType,
  setFilterPatient: (filterPatient: filterPatientType) => void,
  showAddPatient: boolean,
  setShowAddPatient: (showAddPatient: boolean) => void,
}

export const DefaultShowPatientsInterface: ShowPatientsInterface = {
  selectedPatient: DefaultPatientInterface,
  setSelectedPatient: () => {},
  selectedFilter: {}, 
  setSelectedFilter: () => {},
  showSuccessMsg: false,
  setShowSuccessMsg: () => {},
  showEditPatient: false,
  setShowEditPatient: () => {},
  showDeletePatient: false,
  setShowDeletePatient: () => {},
  showPassPatient: false,
  setShowPassPatient: () => {},
  showFinishPatient: false,
  setShowFinishPatient: () => {},
  showReturnPatient: false,
  setShowReturnPatient: () => {},
  filterPatient: DefaultFilterPatientType,
  setFilterPatient: () => {}, 
  showAddPatient: false,
  setShowAddPatient: () => {},
}

export const ShowPatientsContext = createContext(DefaultShowPatientsInterface)
