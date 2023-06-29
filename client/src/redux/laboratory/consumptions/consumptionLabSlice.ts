import { createSlice } from "@reduxjs/toolkit";

const consumptionLabSlice = createSlice({
  name: "consumptionLab",
  initialState: {
    isFetching: false,
    consumptionLab: [],
    error: [],
  },
  reducers: {
    statusConsumptionLabStart: (state) => {
      state.isFetching = true
      state.error = []
    },
    statusConsumptionLabSuccess: (state, action) => {
      state.isFetching = false
      state.consumptionLab = action.payload
      state.error = []
    },
    statusConsumptionLabFailure: (state, action) => {
      state.isFetching = false
      state.error = action.payload
    }
  }
}) 

export const { 
  statusConsumptionLabStart,
  statusConsumptionLabSuccess,
  statusConsumptionLabFailure
} = consumptionLabSlice.actions

export default consumptionLabSlice.reducer
