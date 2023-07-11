import { createContext } from "react"
import { DefaultUserInterface, UserInterface } from "../../../users/types"
import { DefaultListConsumableInterface, ListConsumableInterface } from "../../consumableList/types"

export interface LinePurchaseOrderInterface {
  index: number, // i did this because when i push a new PurchaseOrder i will need it.
  _id: string,
  consumable: ListConsumableInterface,
  qty: number
}

export const DefaultLinePurchaseOrderInterface: LinePurchaseOrderInterface = {
  index: 0,
  _id: "",
  consumable: DefaultListConsumableInterface,
  qty: 0
}

export interface PurchaseOrderInterface {
  doctor: UserInterface,
  num: string,
  reference: string,
  total: number,
  LinePurchaseOrder: LinePurchaseOrderInterface[]
}

export const DefaultPurchaseOrderInterface:PurchaseOrderInterface = {
  doctor: DefaultUserInterface,
  num: "",
  reference: "",
  total: 0,
  LinePurchaseOrder: [DefaultLinePurchaseOrderInterface]
}

export interface ShowPurchaseOrderInterface {
  showSuccessMsg: boolean,
  setShowSuccessMsg: (showSuccessMsg: boolean) => void,
}

export const DefaultShowPurchaseOrderInterface: ShowPurchaseOrderInterface = {
  showSuccessMsg: false,
  setShowSuccessMsg: () => {},
}

export const ShowPurchaseOrderContext = createContext(DefaultShowPurchaseOrderInterface)


export interface DataPurchaseOrderInterface {
  consumable: ListConsumableInterface,
  setConsumable: (consumable: ListConsumableInterface) => void,
  qty: number,
  setQty: (qty: number) => void,
  ListPurchaseOrder: LinePurchaseOrderInterface[],
  setListPurchaseOrder: (ListPurchaseOrder: LinePurchaseOrderInterface[]) => void,
}

export const DefaultDataPurchaseOrderInterface: DataPurchaseOrderInterface = {
  consumable: DefaultListConsumableInterface,
  setConsumable: () => {},
  qty: 0,
  setQty: () => 0,
  ListPurchaseOrder: [DefaultLinePurchaseOrderInterface],
  setListPurchaseOrder: () => {},
}

export const DataPurchaseOrderContext = createContext(DefaultDataPurchaseOrderInterface)


