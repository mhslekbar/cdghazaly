import { createContext } from "react";
import { DefaultUserInterface, UserInterface } from "../../../users/types";
// import { DefaultPurchaseOrderInterface, PurchaseOrderInterface } from "../../purhcaseOrder/types";

export interface accountSupplierInterface {
  doctor: UserInterface,
  balance: number,
}
export const DefaultAccountSupplierInterface: accountSupplierInterface = {
  doctor: DefaultUserInterface,
  balance: 0,
}

export interface historyPaymentInterface {
  _id: string,
  payment: number,
  purchaseOrderId: string,
  createdAt: string
}
export const DefaultHistoryPaymentInterface: historyPaymentInterface = {
  _id: "",
  payment: 0,
  purchaseOrderId: "",
  createdAt: ""
}

export interface SuppliersInterface {
  _id: string,
  name: string,
  phone: string,
  accounts: accountSupplierInterface[],
  historyPayment: historyPaymentInterface[]
}
export const DefaultSuppliersInterface: SuppliersInterface = {
  _id: "",
  name: "",
  phone: "",
  accounts: [DefaultAccountSupplierInterface],
  historyPayment: [DefaultHistoryPaymentInterface]
}
export interface DataSuppliersInterface {
  name: string,
  setName: (name: string) => void,
  phone: string,
  setPhone: (phone: string) => void,
}

export const DefaultDataSuppliersInterface:DataSuppliersInterface = {
  name: "",
  setName: () => {},
  phone: "",
  setPhone: () => {},
}

export const DataSuppliersContext = createContext(DefaultDataSuppliersInterface)

export interface ShowSuppliersInterface {
  showEditSupplier: boolean,
  setShowEditSupplier: (showEditSupplier: boolean) => void,
  selectedSupplier: SuppliersInterface,
  setSelectedSupplier: (selectedSupplier: SuppliersInterface) => void,
  showDeleteSupplier: boolean,
  setShowDeleteSupplier: (showDeleteSupplier: boolean) => void,
}

export const DefaultShowSuppliersInterface: ShowSuppliersInterface = {
  showEditSupplier: false,
  setShowEditSupplier: () => {},
  selectedSupplier: DefaultSuppliersInterface,
  setSelectedSupplier: () => {},
  showDeleteSupplier: false,
  setShowDeleteSupplier: () => {},
}

export const ShowSuppliersContext = createContext(DefaultShowSuppliersInterface)
