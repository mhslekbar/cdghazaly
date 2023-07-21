import { createContext } from "react"
import { DefaultUserInterface, UserInterface } from "../../users/types";

export interface InvoicesAssuranceInterface {
  _id: string,
  doctor: UserInterface[]
  inCommon: boolean;
  numInvoice: string
  payed: boolean
  finish: boolean
}

export const  DefaultInvoicesAssuranceInterface:InvoicesAssuranceInterface = {
  _id: "",
  doctor: [DefaultUserInterface],
  inCommon: false,
  numInvoice: "",
  payed: false,
  finish: false
}


export interface AssuranceInterface {
  _id: string,
  name: string;
  cons_price: number;
  color: string;
  invoices: [InvoicesAssuranceInterface]
}

export const DefaultAssuranceInterface: AssuranceInterface =  {
  _id: "",
  name: "",
  cons_price: 0,
  color: "",
  invoices: [DefaultInvoicesAssuranceInterface]
}


export interface ShowAssurancesInterface {
  showSuccessMsg: boolean,
  setShowSuccessMsg: (showSuccessMsg: boolean) => void,
  showAddModal: boolean,
  setShowAddModal: (showAddModal: boolean) => void,
  showEditModal: boolean,
  setShowEditModal: (showEditModal: boolean) => void,
  showDeleteModal: boolean, 
  setShowDeleteModal: (showDeleteModal: boolean) => void,
  selectedAssurance:AssuranceInterface,
  setSelectedAssurance: (selectedAssurance:AssuranceInterface) => void,
  selectedDoctor: any,
  setSelectedDoctor: (selectedDoctor: any) => void,
  hideDataAssurance: boolean,
  setHideDataAssurance: (hideDataAssurance: boolean) => void,
}

export const DefaultShowAssurancesInterface:ShowAssurancesInterface = {
  showSuccessMsg: false,
  setShowSuccessMsg: () => {},
  showAddModal: false,
  setShowAddModal: () => {},
  showEditModal: false,
  setShowEditModal: () => {},
  showDeleteModal: false, 
  setShowDeleteModal: () => {},
  selectedAssurance: DefaultAssuranceInterface,
  setSelectedAssurance: () => {},
  selectedDoctor: {},
  setSelectedDoctor: () => {},
  hideDataAssurance: false,
  setHideDataAssurance: () => {},
}

export const ShowAssurancesContext = createContext(DefaultShowAssurancesInterface)


export interface DataAssuranceInterface {
  name: string, 
  setName: (name: string) => void,
  cons_price: number,
  setConsPrice: (cons_price: number) => void,
  color: string,
  setColor: (color: string) => void
}

export const DefaultDataAssuranceInterface: DataAssuranceInterface = {
  name: "", 
  setName: () => {},
  cons_price: 0,
  setConsPrice: () => {},
  color: "",
  setColor: () => {}
}

export const DataAssuranceContext = createContext(DefaultDataAssuranceInterface)
