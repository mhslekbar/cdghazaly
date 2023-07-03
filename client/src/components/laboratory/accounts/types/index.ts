import { DefaultUserInterface, UserInterface } from "../../../users/types"

export interface AccountsInterface {
  doctor: UserInterface,
  balance: Number
}

export const DefaultAccountsInterface: AccountsInterface = {
  doctor: DefaultUserInterface,
  balance: 0
}

// export interface DoctorInterface {
//   username: string,   
//   password: string,
//   roles: []
//   phone: string,
//   doctor: UserInterface,
//   _id: string
// }