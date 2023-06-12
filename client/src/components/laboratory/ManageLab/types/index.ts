import { createContext } from "react"

export interface LinksInterface {
  title: string, 
  path?: string, 
  type: string,
  pathDrop?: string
}

export type ManageLabContextType = {
  openDropdown: boolean,
  setOpenDropdown: (openDropdown: boolean) => void
}

export const DefaultManageLabContextType:ManageLabContextType = {
  openDropdown: false,
  setOpenDropdown: () => {}
}

export const ManageLabContext = createContext(DefaultManageLabContextType)

export let linskLaboratory: LinksInterface[] = [
  // title: is title of button
  // path : path what will go
  // type : type of button => "button" || "dropDown"
  // pathDrop: is the path of drop-down 
  // i did this because i need it when i click on buttons 
  // it will change bg-color of button selected
  { title: "Comptes", path: "accounts", type:"button" },
  { title: "Traitements", path: "treatments", type: "button" },
  { title: "Consommations", path: "consumptions",type: "dropDown", pathDrop: "consumptions" },
  { title: "Patients", path: "patients", type: "dropDown", pathDrop: "patients" },
  { title: "Paiements", path: "payments", type: "dropDown", pathDrop: "payments" },
];
