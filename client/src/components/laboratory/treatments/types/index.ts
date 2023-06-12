import { createContext } from "react";
import { DefaultTreatmentType, TreatmentType } from "../../../treatments/types";

export interface TreatmentLabInterface {
  _id: string,
  treatment: TreatmentType,
  price: string
}

export const DefaultTreatmentLabInterface = {
  _id: "",
  treatment: DefaultTreatmentType,
  price: ""
}

export interface DataTreatLabInterface {
  treatment: string, 
  setTreatment: (treatment: string) => void
  price: string,
  setPrice: (price: string) => void
}

export const DefaultDataTreatLabInterface: DataTreatLabInterface = {
  treatment: "", 
  setTreatment: () => {},
  price: "",
  setPrice: () => {}
}

export const DataTreatLabContext = createContext(DefaultDataTreatLabInterface)

export interface ShowTreatLabInterface {
  showEditTLabModal: boolean;
  setShowEditTLabModal: (showEditTLabModal: boolean) => void;
  showDeleteTLabModal: boolean,
  setShowDeleteTLabModal: (showDeleteTLabModal: boolean) => void,
  selectedTreatLab: TreatmentLabInterface, 
  setSelectedTreatLab: (selectedTreatLab: TreatmentLabInterface) => void
}

export const DefaultShowTreatLabInterface: ShowTreatLabInterface = {
  showEditTLabModal: false,
  setShowEditTLabModal: () => {},
  showDeleteTLabModal: false,
  setShowDeleteTLabModal: () => {},
  selectedTreatLab: DefaultTreatmentLabInterface, 
  setSelectedTreatLab: () => {}
};