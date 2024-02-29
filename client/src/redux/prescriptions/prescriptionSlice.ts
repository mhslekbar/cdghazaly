import { createSlice } from "@reduxjs/toolkit";

interface props {
  isFetching: boolean;
  prescriptions: [];
  error: string[];
}

const initialState: props = {
  isFetching: false,
  prescriptions: [],
  error: [],
}
const PrescriptionSlice = createSlice({
  name: "prescriptions",
  initialState,
  reducers: {
    statusPrescriptionStart: (state) => {
      state.isFetching = true
      state.error = []
    },
    statusPrescriptionSuccess: (state, action) => {
      state.isFetching = false
      state.prescriptions = action.payload
      state.error = []
    },
    statusPrescriptionFailure: (state, action) => {
      state.isFetching = false
      if(action.payload[0]?.startsWith("AFFICHER")) {
        state.prescriptions = []
      }
      state.error = action.payload
    }
  }
}) 

export const { statusPrescriptionStart, statusPrescriptionSuccess, statusPrescriptionFailure } = PrescriptionSlice.actions

export default PrescriptionSlice.reducer
