import { createContext } from "react"
import { DefaultUserInterface, UserInterface } from "../../../users/types"
import { formattedDate } from "../../../../functions/functions"
import { DefaultPatientInterface, PatientInterface } from "../../../patients/types"
import { DefaultInvoicesAssuranceInterface, InvoicesAssuranceInterface } from "../../../assurances/types"

export enum EnumTypePayment {
  PAYMENT = "payment",
  SOINS = "soins",
  CONSULTATION = "consultations"
}

export interface PaymentMethodInterface {
  _id: string,
  name: string,
  code: string,
  archive: number
}

export const DefaultPaymentMethodInterface:PaymentMethodInterface = {
  _id: "",
  name: "",
  code: "",
  archive: 0
}

export interface DataPaymentsInterface {
  amount: number,
  setAmount: (amount: number) => void,
  doctor: UserInterface,
  setDoctor: (doctor: UserInterface) => void,
  type: string,
  setType: (type: string) => void,
  paymentMethod: PaymentMethodInterface,
  setPaymentMethod: (paymentMethod: PaymentMethodInterface) => void,
  supported: string,
  setSupported: (supported: string) => void,
  createdAt: string,
  setCreatedAt: (createdAt: "") => void,
}

export const DefaultDataPaymentsInterface: DataPaymentsInterface = {
  amount: 0,
  setAmount: () => {},
  doctor: DefaultUserInterface,
  setDoctor: () => {},
  type: "",
  setType: () => {},
  paymentMethod: DefaultPaymentMethodInterface,
  setPaymentMethod: () => {},
  supported: "",
  setSupported: () => {},
  createdAt: formattedDate(new Date().toString()),
  setCreatedAt: () => {},
}

export const DataPaymentsContext = createContext(DefaultDataPaymentsInterface)


export interface PaymentInterface {
  _id: string,
  user: UserInterface,
  doctor: UserInterface,
  patient: PatientInterface,
  amount: number,
  type: string,
  method: PaymentMethodInterface,
  supported: string,
  invoiceAssur: InvoicesAssuranceInterface,
  createdAt: string,
}

export const  DefaultPaymentInterface:PaymentInterface = {
  _id: "",
  user: DefaultUserInterface,
  doctor: DefaultUserInterface,
  patient: DefaultPatientInterface,
  amount: 0,
  type: "",
  method: DefaultPaymentMethodInterface,
  supported: "",
  invoiceAssur: DefaultInvoicesAssuranceInterface,
  createdAt: ""
}

export enum EnumTypeModalPayment {
  ADD_MODAL = "ADD_MODAL",
  EDIT_MODAL = "EDIT_MODAL",
}


export interface ShowPaymentsInterface {
  showSuccessMsg: boolean,
  setShowSuccessMsg: (showSuccessMsg: boolean) => void,
  showEditPayment: boolean,
  setShowEditPayment: (showEditPayment: boolean) => void,
  selectedPayment: PaymentInterface, 
  setSelectedPayment: (selectedPayment: PaymentInterface) => void,
  ModalType: EnumTypeModalPayment,
  setModalType: (ModalType: EnumTypeModalPayment) => void,
  showDeletePayment: boolean,
  setShowDeletePayment: (showDeletePayment: boolean) => void,
}

export const DefaultShowPaymentsInterface: ShowPaymentsInterface = {
  showSuccessMsg: false,
  setShowSuccessMsg: () => {},
  showEditPayment: false,
  setShowEditPayment: () => {},
  selectedPayment: DefaultPaymentInterface, 
  setSelectedPayment: () => {},
  ModalType: EnumTypeModalPayment.ADD_MODAL,
  setModalType: () => {},
  showDeletePayment: false,
  setShowDeletePayment: () => {},
}

export const ShowPaymentsContext = createContext(DefaultShowPaymentsInterface)
