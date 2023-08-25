import { createContext } from "react";
import { DefaultPurchaseOrderInterface, PurchaseOrderInterface } from "../../../purhcaseOrder/types";
import { DefaultSuppliersInterface, SuppliersInterface } from "../../types";

export interface AboutSupplierInterface {
  selectedSupplier: SuppliersInterface,
  setSelectedSupplier: (selectedSupplier: SuppliersInterface) => void,
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
  selectedSupplier: DefaultSuppliersInterface,
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

