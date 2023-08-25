import { createContext } from "react";

export interface ListConsumableInterface {
  _id: string,
  name: string,
  createdAt: Date,
}

export const DefaultListConsumableInterface: ListConsumableInterface = {
  _id: "",
  name: "",
  createdAt: new Date(),
}

export interface DataConsumableListInterface {
  name: string,
  setName: (name: string) => void,
}

export const DefaultDataConsumableListInterface: DataConsumableListInterface = {
  name: "",
  setName: () => {},
}

export const DataConsumableListContext = createContext(DefaultDataConsumableListInterface)

export interface ShowConsumableListInterface {
  showEditListConsumable: boolean,
  setShowEditListConsumable: (showEditListConsumable: boolean) => void,
  showDeleteListConsumable: boolean,
  setShowDeleteListConsumable: (showDeleteListConsumable: boolean) => void,
  selectedListConsumable: ListConsumableInterface,
  setSelectedListConsumable: (selectedListConsumable: ListConsumableInterface) => void,
}

export const DefaultShowConsumableListInterface: ShowConsumableListInterface = {
  showEditListConsumable: false,
  setShowEditListConsumable: () => {},
  showDeleteListConsumable: false,
  setShowDeleteListConsumable: () => {},
  selectedListConsumable: DefaultListConsumableInterface,
  setSelectedListConsumable: () => {},
}

export const ShowConsumableListContext = createContext(DefaultShowConsumableListInterface)
