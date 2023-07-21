import { createSlice } from "@reduxjs/toolkit";

const treatmentLabSlice = createSlice({
  name: "treatmentLab",
  initialState: {
    isFetching: false,
    treatmentLab: [],
    error: [],
  },
  reducers: {
    statusTreatmentLabStart: (state) => {
      state.isFetching = true
      state.error = []
    },
    statusTreatmentLabSuccess: (state, action) => {
      state.isFetching = false
      state.treatmentLab = action.payload
      state.error = []
    },
    statusTreatmentLabFailure: (state, action) => {
      state.isFetching = false
      if(action.payload[0]?.startsWith("AFFICHER")) {
        state.treatmentLab = []
      }
      state.error = action.payload
    }
  }
}) 

export const { 
  statusTreatmentLabStart,
  statusTreatmentLabSuccess,
  statusTreatmentLabFailure
} = treatmentLabSlice.actions

export default treatmentLabSlice.reducer
