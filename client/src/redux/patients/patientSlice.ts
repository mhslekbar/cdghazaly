import { createSlice } from "@reduxjs/toolkit";
import { PatientInterface } from "../../components/patients/types"

interface PatientStateInterface {
  isFetching: boolean;
  patients: PatientInterface[];
  error: string[];
}

const initialState: PatientStateInterface = {
  isFetching: false,
  patients: [],
  error: [],
}
const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    statusPatientStart: (state) => {
      state.isFetching = true
      state.error = []
    },
    statusPatientSuccess: (state, action) => {
      state.isFetching = false
      state.patients = action.payload
      state.error = []
    },
    statusPatientFailure: (state, action) => {
      state.isFetching = false
      if(action.payload[0]?.startsWith("AFFICHER")) {
        state.patients = []
      }
      state.error = action.payload
    }
  }
}) 

export const { statusPatientStart, statusPatientSuccess, statusPatientFailure } = patientSlice.actions

export default patientSlice.reducer
