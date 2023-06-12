import { createContext } from "react"
import { AssuranceInterface } from "../../types"

export interface ManageAssuranceInterface {
  Assurance: AssuranceInterface
}

export type ManageAssuranceContextType = {
  openDropdown: boolean,
  setOpenDropdown: (openDropdown: boolean) => void
}

export const DefaultManageAssuranceContextType:ManageAssuranceContextType = {
  openDropdown: false,
  setOpenDropdown: () => {}
}

export const ManageAssuranceContext = createContext(DefaultManageAssuranceContextType)

export interface LinksInterface {
  title: string, 
  path?: string, 
  type: string,
  pathDrop?: string
}

export let linskAssurance: LinksInterface[] = [
  // title: is title of button
  // path : path what will go
  // type : type of button => "button" || "dropDown"
  // pathDrop: is the path of drop-down 
  // i did this because i need it when i click on buttons 
  // it will change bg-color of button selected
  { title: "Traitements", path: "treatments", type: "button" },
  { title: "Patients", path: "patients", type: "dropDown", pathDrop: "patients" },
];
