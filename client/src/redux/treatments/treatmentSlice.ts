import { createSlice } from "@reduxjs/toolkit";

const treatmentSlice = createSlice({
  name: "treatment",
  initialState: {
    isFetching: false,
    treatments: [],
    error: [],
  },
  reducers: {
    statusTreatStart: (state) => {
      state.isFetching = true
      state.error = []
    },
    statusTreatSuccess: (state, action) => {
      state.isFetching = false
      state.treatments = action.payload
      state.error = []
    },
    statusTreatFailure: (state, action) => {
      state.isFetching = false
      if(action.payload[0].startsWith("AFFICHER")) {
        state.treatments = []
      }
      state.error = action.payload
    }
  }
}) 

export const { statusTreatStart, statusTreatSuccess, statusTreatFailure } = treatmentSlice.actions

export default treatmentSlice.reducer
