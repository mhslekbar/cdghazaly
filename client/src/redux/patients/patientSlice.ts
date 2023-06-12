import { createSlice } from "@reduxjs/toolkit";

const patientSlice = createSlice({
  name: "patient",
  initialState: {
    isFetching: false,
    patients: [],
    error: [],
  },
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
      state.error = action.payload
    }
  }
}) 

export const { statusPatientStart, statusPatientSuccess, statusPatientFailure } = patientSlice.actions

export default patientSlice.reducer
