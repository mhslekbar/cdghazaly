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
  social: boolean;
  finish: boolean;
  balance: number;
  date_archive: Date;
  archive: boolean;
  createdAt: Date
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
  social: false,
  finish: false,
  balance: 0,
  date_archive: new Date(),
  archive: false,
  createdAt: new Date()
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
  social: boolean,
  setSocial: (social: boolean) => void,
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
  social: false,
  setSocial: () => {},
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
  setSelectedDoctor: () => {}
}

export const DefaultDataInputsPatientContext = createContext(DefaultDataInputsPatientInterface)

// End Add Patient



export interface ShowPatientsInterface {
  selectedPatient: PatientInterface,
  setSelectedPatient: (selectedPatient: PatientInterface) => void,
  selectedFilter: any, 
  setSelectedFilter: (selectedFilter: any) => void,
  showSuccecMsg: boolean,
  setShowSuccecMsg: (showSuccecMsg: boolean) => void,
  showEditPatient: boolean,
  setShowEditPatient: (showEditPatient: boolean) => void,
  showDeletePatient: boolean,
  setShowDeletePatient: (showDeletePatient: boolean) => void,
  showPassPatient: boolean,
  setShowPassPatient: (showPassPatient: boolean) => void,
  showFinishPatient: boolean,
  setShowFinishPatient: (showFinishPatient: boolean) => void,
}

export const DefaultShowPatientsInterface: ShowPatientsInterface = {
  selectedPatient: DefaultPatientInterface,
  setSelectedPatient: () => {},
  selectedFilter: {}, 
  setSelectedFilter: () => {},
  showSuccecMsg: false,
  setShowSuccecMsg: () => {},
  showEditPatient: false,
  setShowEditPatient: () => {},
  showDeletePatient: false,
  setShowDeletePatient: () => {},
  showPassPatient: false,
  setShowPassPatient: () => {},
  showFinishPatient: false,
  setShowFinishPatient: () => {},
}

export const ShowPatientsContext = createContext(DefaultShowPatientsInterface)
