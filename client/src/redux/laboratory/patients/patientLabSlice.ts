import { createSlice } from "@reduxjs/toolkit";

const patientLabSlice = createSlice({
  name: "patientLab",
  initialState: {
    isFetching: false,
    patientLab: [],
    error: [],
  },
  reducers: {
    statusPatientLabStart: (state) => {
      state.isFetching = true
      state.error = []
    },
    statusPatientLabSuccess: (state, action) => {
      state.isFetching = false
      state.patientLab = action.payload
      state.error = []
    },
    statusPatientLabFailure: (state, action) => {
      state.isFetching = false
      if(action.payload[0]?.startsWith("AFFICHER")) {
        state.patientLab = []
      }
      state.error = action.payload
    }
  }
}) 

export const { 
  statusPatientLabStart,
  statusPatientLabSuccess,
  statusPatientLabFailure
} = patientLabSlice.actions

export default patientLabSlice.reducer
