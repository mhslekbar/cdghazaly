import { UserInterface } from "../../../users/types"

export interface AccountsInterface {
  doctor: DoctorInterface,
  balance: Number
}

export interface DoctorInterface {
  username: string,   
  password: string,
  roles: []
  phone: string,
  doctor: UserInterface,
  _id: string
}