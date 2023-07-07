import { createContext } from "react"
import { DefaultUserInterface, UserInterface } from "../../../users/types"

export interface PaymentLabType {
  _id: string,
  doctor: UserInterface,
  comment: string,
  amount: string
  createdAt: Date
  updatedAt: Date
}

export const DefaultPaymentLabType = {
  _id: "",
  doctor: DefaultUserInterface,
  comment: "",
  amount: "",
  createdAt: new Date(),
  updatedAt: new Date()
}

export interface AddPaymentLabInterface {
  amount: string, 
  setAmount: (amount: string) => void,
  comment: string,
  setComment: (comment: string) => void
}

export const DefaultAddPaymentLabInterface: AddPaymentLabInterface =  {
  amount: "", 
  setAmount: () => {},
  comment: "",
  setComment: () => {}
}
 
export const DataPaymentLabContext = createContext(DefaultAddPaymentLabInterface)



export interface ShowLabPaymentInterface {
  showEditPLabModal: boolean,
  setShowEditPLabModal: (showEditPLabModal: boolean) => void,
  showDeletePLabModal: boolean,
  setShowDeletePLabModal: (showDeletePLabModal: boolean) => void,
  selectedPaymentLab: PaymentLabType, 
  setSelectedPaymentLab: (selectedPaymentLab: PaymentLabType) => void
}

export const DefaultShowLabPaymentInterface: ShowLabPaymentInterface = {
  showEditPLabModal: false,
  setShowEditPLabModal: () => {},
  showDeletePLabModal: false,
  setShowDeletePLabModal: () => {},
  selectedPaymentLab: DefaultPaymentLabType,
  setSelectedPaymentLab: () => {}
}

export const ShowLabPaymentsContext = createContext(DefaultShowLabPaymentInterface)
