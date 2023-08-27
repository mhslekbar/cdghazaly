import { createContext } from "react";
import { DefaultUserInterface, UserInterface } from "../../../users/types";

// START ACCOUNTS
export interface accountSupplierInterface {
  doctor: UserInterface,
  balance: number,
}
export const DefaultAccountSupplierInterface: accountSupplierInterface = {
  doctor: DefaultUserInterface,
  balance: 0,
}
// END ACCOUNTS

export interface historyPaymentInterface {
  _id: string,
  payment: number,
  purchaseOrderId: {},
  createdAt: string
}

export const DefaultHistoryPaymentInterface: historyPaymentInterface = {
  _id: "",
  payment: 0,
  purchaseOrderId: {},
  createdAt: ""
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

// START Supplier
export interface SupplierInterface {
  _id: string,
  name: string,
  phone: string,
  accounts: accountSupplierInterface[],
  historyPayment: historyPaymentInterface[]
}
export const DefaultSupplierInterface: SupplierInterface = {
  _id: "",
  name: "",
  phone: "",
  accounts: [DefaultAccountSupplierInterface],
  historyPayment: [DefaultHistoryPaymentInterface]
}

// END Supplier

export interface ShowSuppliersInterface {
  showEditSupplier: boolean,
  setShowEditSupplier: (showEditSupplier: boolean) => void,
  selectedSupplier: SupplierInterface,
  setSelectedSupplier: (selectedSupplier: SupplierInterface) => void,
  showDeleteSupplier: boolean,
  setShowDeleteSupplier: (showDeleteSupplier: boolean) => void,
}

export const DefaultShowSuppliersInterface: ShowSuppliersInterface = {
  showEditSupplier: false,
  setShowEditSupplier: () => {},
  selectedSupplier: DefaultSupplierInterface,
  setSelectedSupplier: () => {},
  showDeleteSupplier: false,
  setShowDeleteSupplier: () => {},
}

export const ShowSuppliersContext = createContext(DefaultShowSuppliersInterface)
