import { createContext } from "react";
import { DefaultPatientInterface, PatientInterface } from "../../patients/types";

export interface PrescriptionInterface {
  _id: string,
  patient: PatientInterface,
  content: string,
  createdAt: Date,
}

export const DefaultPrescriptionInterface: PrescriptionInterface = {
  _id: "",
  patient: DefaultPatientInterface,
  content: "",
  createdAt: new Date(),
}

export interface DataPrescriptionInterface {
  content: string,
  setContent: (content: string) => void,
}

export const DefaultDataPrescriptionInterface: DataPrescriptionInterface = {
  content: "",
  setContent: () => {},
}

export const DataPrescriptionContext = createContext(DefaultDataPrescriptionInterface)

export interface ShowPrescriptionInterface {
  showSuccessMsg: boolean, setShowSuccessMsg: (showSuccessMsg: boolean) => void,
  showEditPrescription: boolean,
  setShowEditPrescription: (showEditPrescription: boolean) => void,
  showDeletePrescription: boolean,
  setShowDeletePrescription: (showDeletePrescription: boolean) => void,
  selectedPrescription: PrescriptionInterface,
  setSelectedPrescription: (selectedPrescription: PrescriptionInterface) => void,
}

export const DefaultShowPrescriptionInterface: ShowPrescriptionInterface = {
  showSuccessMsg: false, setShowSuccessMsg: () => {},
  showEditPrescription: false,
  setShowEditPrescription: () => {},
  showDeletePrescription: false,
  setShowDeletePrescription: () => {},
  selectedPrescription: DefaultPrescriptionInterface,
  setSelectedPrescription: () => {},
}

export const ShowPrescriptionContext = createContext(DefaultShowPrescriptionInterface)
