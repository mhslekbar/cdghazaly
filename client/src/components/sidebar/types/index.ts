import { InterfaceOfLink } from "../OffCanvas";

export enum PatientTypePath {
  CONSULTATION = "consultation",
  FINISH = "finish",
  CURRENT = "current"
}

export let listPatient: InterfaceOfLink[] = [
  { title: "Consulations", path: PatientTypePath.CONSULTATION },
  { title: "Patients Terminé", path: PatientTypePath.FINISH },
  { title: "Patients Actuels", path: PatientTypePath.CURRENT },
];