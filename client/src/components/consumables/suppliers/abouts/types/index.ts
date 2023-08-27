import { createContext } from "react";
import { SupplierInterface, DefaultSupplierInterface } from "../../types";
import { DefaultPurchaseOrderInterface, PurchaseOrderInterface } from "../../../purchaseOrder/types";

export interface AboutSupplierInterface {
  selectedSupplier: SupplierInterface,
  setSelectedSupplier: (selectedSupplier: SupplierInterface) => void,
  showPurchaseOrders: boolean,
  setShowPurchaseOrders: (showPurchaseOrders: boolean) => void,
  showModalPurchaseOrder: boolean,
  setShowModalPurchaseOrder: (showModalPurchaseOrder: boolean) => void,
  selectedModalPurchaseOrder: PurchaseOrderInterface,
  setSelectedModalPurchaseOrder: (selectedModalPurchaseOrder: PurchaseOrderInterface) => void,
  showHistoryPayment: boolean,
  setShowHistoryPayment: (showHistoryPayment: boolean) => void,
}

export const DefaultAboutSupplierInterface: AboutSupplierInterface =  {
  selectedSupplier: DefaultSupplierInterface,
  setSelectedSupplier: () => {},
  showPurchaseOrders: false,
  setShowPurchaseOrders: () => {},
  showModalPurchaseOrder: false,
  setShowModalPurchaseOrder: () => {},
  selectedModalPurchaseOrder: DefaultPurchaseOrderInterface,
  setSelectedModalPurchaseOrder: () => {},
  showHistoryPayment: false,
  setShowHistoryPayment: () => {},
}

export const AboutSupplierContext = createContext(DefaultAboutSupplierInterface)

