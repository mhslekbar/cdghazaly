import { createContext } from "react";
import { DefaultTreatmentType, TreatmentType } from "../../../treatments/types";
import { DefaultUserInterface, UserInterface } from "../../../users/types";
import { DefaultPatientInterface, PatientInterface } from "../../../patients/types";

export interface DevisInterface {
  _id: string, 
  user: UserInterface,
  patient: PatientInterface,
  numDevis: number,
  reduce: number,
  LineDevis: [LineDevisType],
  createdAt: string,
}

export interface LineDevisType {
  _id?: string,
  doctor: UserInterface,
  treatment: TreatmentType,
  price: number,
  teeth: {
    nums: string[],
    surface: string
  },
  createdAt?: string,
  updatedAt?: string
}

export const DefaultLineDevisType: LineDevisType = {
  _id: "",
  doctor: DefaultUserInterface,
  treatment: DefaultTreatmentType,
  price: 0,
  teeth: {
    nums: [""],
    surface: ""
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()

}

export const DefaultDevisInterface:DevisInterface = {
  _id: "", 
  user: DefaultUserInterface,
  patient: DefaultPatientInterface,
  numDevis: 0,
  reduce: 0,
  LineDevis: [DefaultLineDevisType],
  createdAt: new Date().toISOString()
}

export interface ShowDevisInterface {
  selectedDevis: DevisInterface,
  setSelectedDevis: (selectedDevis: DevisInterface) => void,
  showTeethBoard: boolean,
  setShowTeethBoard: (showTeethBoard: boolean) => void,
  showEditDevis: boolean,
  setShowEditDevis: (showEditDevis: boolean) => void,
  showDeleteDevis: boolean,
  setShowDeleteDevis: (showDeleteDevis: boolean) => void,
  showSuccessMsg: boolean,
  setShowSuccessMsg: (showSuccessMsg: boolean) => void,
  isShowingAllDevis: boolean,
  setIsShowingAllDevis: (isShowingAllDevis: boolean) => void,

}

export const DefaultShowDevisInterface: ShowDevisInterface = {
  selectedDevis: DefaultDevisInterface,
  setSelectedDevis: () => {},
  showTeethBoard: false,
  setShowTeethBoard: () => {},
  showEditDevis: false,
  setShowEditDevis: () => {},
  showDeleteDevis: false,
  setShowDeleteDevis: () => {},
  showSuccessMsg: false,
  setShowSuccessMsg: () => {},
  isShowingAllDevis: false,
  setIsShowingAllDevis: () => {},
}

export const ShowDevisInterfaceContext = createContext(DefaultShowDevisInterface)

export enum EnumTypeModal {
  ADD_DEVIS_MODAL = "ADD-DEVIS-MODAL",
  EDIT_DEVIS_MODAL = "EDIT-DEVIS-MODAL",
  APPEND_FICHE_MODAL = "APPEND_FICHE_MODAL",
} 

export const DefaultTypeModal: EnumTypeModal = EnumTypeModal.ADD_DEVIS_MODAL;

export interface DataDevisInterface {
  doctor: UserInterface,
  setDoctor: (doctor: UserInterface) => void,
  treat: string, 
  setTreat: (treat: string) => void,
  reduce: string,
  setReduce: (reduce: string) => void,
  selectedTeeth: string[],
  setSelectedTeeth: (selectedTeeth: string[]) => void,
  selectedTreat: TreatmentType, 
  setSelectedTreat: (selectedTreat: TreatmentType) => void,
  price: number,
  setPrice: (price: number) => void,
  LineDevis: LineDevisType[],
  setLineDevis: (LineDevis: LineDevisType[]) => void,
  selectedSurface: string,
  setSelectedSurface: (selectedSurface: string) => void,
  ArrayDoctor: UserInterface[],
  setArrayDoctor: (doctor: UserInterface[]) => void,
  TeethBoardData: LineDevisType,
  setTeethBoardData: (TeethBoardData: LineDevisType) => void,
  TypeTeethBoard: string,
  setTypeTeethBoard: (TypeTeethBoard: string) => void,
  TypeModal: EnumTypeModal,
  setTypeModal: (TypeTypeModal: EnumTypeModal) => void,
}

export const DefaultDataDevisInterface: DataDevisInterface = {
  doctor: DefaultUserInterface,
  setDoctor: () => {},
  treat: "", 
  setTreat: () => {},
  reduce: "",
  setReduce: () => {},
  selectedTeeth: [""],
  setSelectedTeeth: () => {},
  selectedTreat: DefaultTreatmentType, 
  setSelectedTreat: () => {},
  price: 0,
  setPrice: () => {},
  LineDevis: [DefaultLineDevisType],
  setLineDevis: () => {},
  selectedSurface: "",
  setSelectedSurface: () => {},
  ArrayDoctor: [DefaultUserInterface],
  setArrayDoctor: () => {},
  TeethBoardData: DefaultLineDevisType,
  setTeethBoardData: () => {},
  TypeTeethBoard: "",
  setTypeTeethBoard: () => {},
  TypeModal: DefaultTypeModal,
  setTypeModal: () => {},
}

export const DataDevisContext = createContext(DefaultDataDevisInterface)

export enum EnumTypeTeethBoard {
  ADD_NEW_TEETH = "Add-New-Teeth",
  EDIT_NEW_TEETH = "Edit-New-Teeth",
  APPEND_TEETH = "Append-Teeth",
  APPEND_TEETH_FICHE = "Append-Teeth-Fiche",
  EDIT_TEETH_FICHE = "EDIT-Teeth-Fiche",
} 

