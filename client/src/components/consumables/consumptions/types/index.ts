import { createContext } from "react";
import { DefaultUserInterface, UserInterface } from "../../../users/types";

export interface MyConsumptionsInterface {
  _id: string,
  doctor: UserInterface,
  note: string,
  amount: number,
  createdAt: Date,
}

export const DefaultMyConsumptionsInterface: MyConsumptionsInterface = {
  _id: "",
  doctor: DefaultUserInterface,
  note: "",
  amount: 0,
  createdAt: new Date(),
}

export interface DataConsumptionInterface {
  amount: number,
  setAmount: (amount: number) => void,
  note: string,
  setNote: (note: string) => void,
  doctor: UserInterface,
  setDoctorId: (doctor: UserInterface) => void,
}

export const DefaultDataConsumptionInterface:DataConsumptionInterface = {
  amount: 0,
  setAmount: () => {},
  note: "",
  setNote: () => {},
  doctor: DefaultUserInterface,
  setDoctorId: () => {},
}

export const DataConsumptionContext = createContext(DefaultDataConsumptionInterface)

export interface ShowMyConsumptionInterface {
  showEditConsumption: boolean,
  setShowEditConsumption: (showEditConsumption: boolean) => void,
  selectedConsumption: MyConsumptionsInterface,
  setSelectedConsumption: (selectedConsumption: MyConsumptionsInterface) => void,
  showDeleteConsumption: boolean,
  setShowDeleteConsumption: (showDeleteConsumption: boolean) => void,
}

export const DefaultShowMyConsumptionInterface: ShowMyConsumptionInterface = {
  showEditConsumption: false,
  setShowEditConsumption: () => {},
  selectedConsumption: DefaultMyConsumptionsInterface,
  setSelectedConsumption: () => {},
  showDeleteConsumption: false,
  setShowDeleteConsumption: () => {},
}

export const ShowMyConsumptionContext = createContext(DefaultShowMyConsumptionInterface)
