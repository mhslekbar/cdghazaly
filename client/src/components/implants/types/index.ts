import { AppointmentInterface } from "../../appointments/AppointmentsTable/types";
import { PatientInterface } from "../../patients/types";
import { TreatmentType } from "../../treatments/types";
import { UserInterface } from "../../users/types";

export interface ImplantInterface {
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