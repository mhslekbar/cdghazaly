import { createContext } from "react"
import { DefaultUserInterface, UserInterface } from "../../../users/types"
import { DefaultListConsumableInterface, ListConsumableInterface } from "../../consumableList/types"
import { DefaultSuppliersInterface, SuppliersInterface } from "../../suppliers/types"

export interface LinePurchaseOrderInterface {
  _id?: string,
  consumable: ListConsumableInterface,
  qty: number,
  createdAt: Date,
}

export const DefaultLinePurchaseOrderInterface: LinePurchaseOrderInterface = {
  _id: "",
  consumable: DefaultListConsumableInterface,
  qty: 0,
  createdAt: new Date(),
}

export interface PurchaseOrderInterface {
  _id: string,
  doctor: UserInterface,
  supplier: SuppliersInterface,
  num: string,
  reference: string,
  total: number,
  LinePurchaseOrder: LinePurchaseOrderInterface[],
  createdAt: Date,
  paymentDate: Date,
}

export const DefaultPurchaseOrderInterface:PurchaseOrderInterface = {
  _id: "",
  doctor: DefaultUserInterface,
  supplier: DefaultSuppliersInterface,
  num: "",
  reference: "",
  total: 0,
  LinePurchaseOrder: [DefaultLinePurchaseOrderInterface],
  createdAt: new Date(),
  paymentDate: new Date(),
}

export interface ShowPurchaseOrderInterface {
  showSuccessMsg: boolean,
  setShowSuccessMsg: (showSuccessMsg: boolean) => void,
  selectedPurchaseOrder: PurchaseOrderInterface,
  setSelectedPurchaseOrder: (selectedPurchaseOrder: PurchaseOrderInterface) => void,
  showEditPurchaseOrder: boolean,
  setShowEditPurchaseOrder: (showEditPurchaseOrder: boolean) => void,
  showDeletePurchaseOrder: boolean,
  setShowDeletePurchaseOrder: (showDeletePurchaseOrder: boolean) => void,
  showPaymentPurchaseOrder: boolean, 
  setShowPaymentPurchaseOrder: (showPaymentPurchaseOrder: boolean) => void,
}

export const DefaultShowPurchaseOrderInterface: ShowPurchaseOrderInterface = {
  showSuccessMsg: false,
  setShowSuccessMsg: () => {},
  selectedPurchaseOrder: DefaultPurchaseOrderInterface,
  setSelectedPurchaseOrder: () => {},
  showEditPurchaseOrder: false,
  setShowEditPurchaseOrder: () => {},
  showDeletePurchaseOrder: false,
  setShowDeletePurchaseOrder: () => {},
  showPaymentPurchaseOrder: false, 
  setShowPaymentPurchaseOrder: () => {},
}

export const ShowPurchaseOrderContext = createContext(DefaultShowPurchaseOrderInterface)


export interface DataPurchaseOrderInterface {
  ListPurchaseOrder: LinePurchaseOrderInterface[],
  setListPurchaseOrder: (ListPurchaseOrder: LinePurchaseOrderInterface[]) => void,
  supplier: SuppliersInterface,
  setSupplier: (supplier: SuppliersInterface) => void
}

export const DefaultDataPurchaseOrderInterface: DataPurchaseOrderInterface = {
  ListPurchaseOrder: [DefaultLinePurchaseOrderInterface],
  setListPurchaseOrder: () => {},
  supplier: DefaultSuppliersInterface,
  setSupplier: () => {}
}

export const DataPurchaseOrderContext = createContext(DefaultDataPurchaseOrderInterface)


