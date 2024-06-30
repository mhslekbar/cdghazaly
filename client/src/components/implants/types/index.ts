import { createContext } from "react";
import { AppointmentInterface, DefaultAppointmentInterface } from "../../appointments/AppointmentsTable/types";
import {  DefaultPatientInterface, PatientInterface } from "../../patients/types";
import { DefaultTreatmentType, TreatmentType } from "../../treatments/types";
import { DefaultUserInterface, UserInterface } from "../../users/types";

export interface ImplantInterface {
  _id: string,
  doctor: UserInterface,
  patient: PatientInterface,
  treatment: TreatmentType,
  price: number,
  teeth: {
    nums: [],
    surface: string
  },
  appointment: AppointmentInterface,
  isSetAppointment: boolean,
  createdAt: string,
  updatedAt: string,
}
export const DefaultImplantInterface: ImplantInterface = {
  _id: "",
  doctor: DefaultUserInterface,
  patient: DefaultPatientInterface,
  treatment: DefaultTreatmentType,
  price: 0,
  teeth: {
    nums: [],
    surface: ""
  },
  appointment: DefaultAppointmentInterface,
  isSetAppointment: false,
  createdAt: "",
  updatedAt: "",
}

export interface ShowImplantsInterface {
  showAppointmentModal: boolean, setShowAppointmentModal: (showAppointmentModal: boolean) => void,
  implantData: ImplantInterface, setImplantData: (implantData: ImplantInterface) => void, 
  showSuccessMsg: boolean, setShowSuccessMsg: (showSuccessMsg: boolean) => void,
  showFinishImplant: boolean, setShowFinishImplant: (showFinishImplant: boolean) => void,
  typeFilterImplant: boolean, setTypeFilterImplant: (typeFilterImplant: boolean) => void,
}

export const DefaultShowImplantsInterface: ShowImplantsInterface = {
  showAppointmentModal: false, setShowAppointmentModal: () => {},
  implantData: DefaultImplantInterface, setImplantData: () => {}, 
  showSuccessMsg: false, setShowSuccessMsg: () => {},
  showFinishImplant: false, setShowFinishImplant: () => {},
  typeFilterImplant: false, setTypeFilterImplant: () => {},
}

export const ShowImplantContext = createContext<ShowImplantsInterface>(DefaultShowImplantsInterface)
