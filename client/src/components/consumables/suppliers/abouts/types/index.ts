import { createContext } from "react";

export interface AboutSupplierInterface {
  showPurchaseOrders: boolean,
  setShowPurchaseOrders: (showPurchaseOrders: boolean) => void,
}

export const DefaultAboutSupplierInterface: AboutSupplierInterface =  {
  showPurchaseOrders: false,
  setShowPurchaseOrders: () => {},
}

export const AboutSupplierContext = createContext(DefaultAboutSupplierInterface) 