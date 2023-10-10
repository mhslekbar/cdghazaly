import { createContext } from "react"

export interface DataPaymentModeInterface {
  name: string, 
  setName: (name: string) => void,
  code: number,
  setCode: (code: number) => void,
  archive: boolean,
  setArchive: (archive: boolean) => void
}

export const DefaultDataPaymentModeInterface: DataPaymentModeInterface = {
  name: "", 
  setName: () => {},
  code: 0,
  setCode: () => {},
  archive: false,
  setArchive: () => {}
}

export const DataPaymentModeContext = createContext(DefaultDataPaymentModeInterface)



export interface PaymentModeInterface {
  _id: string, 
  name: string, 
  code: number,
  archive: boolean,
}

export const DefaultPaymentModeInterface: PaymentModeInterface = {
  _id: "",
  name: "", 
  code: 0,
  archive: false,
}

export interface ShowPaymentModeInterface {
  showSuccessMsg: boolean,
  setShowSuccessMsg: (showSuccessMsg: boolean) => void,
  showEditModal: boolean,
  setShowEditModal: (showEditModal: boolean) => void,
  showDeleteModal: boolean,
  setShowDeleteModal: (showDeleteModal: boolean) => void,
  selectedPaymentMode: PaymentModeInterface,
  setSelectedPaymentMode: (selectedPaymentMode: PaymentModeInterface) => void
}

export const DefaultShowPaymentModeInterface:ShowPaymentModeInterface = {
  showSuccessMsg: false,
  setShowSuccessMsg: () => {},
  showEditModal: false,
  setShowEditModal: () => {},
  showDeleteModal: false,
  setShowDeleteModal: () => {},
  selectedPaymentMode: DefaultPaymentModeInterface,
  setSelectedPaymentMode: () => {}
}

export const ShowPaymentModeContext = createContext(DefaultShowPaymentModeInterface)
