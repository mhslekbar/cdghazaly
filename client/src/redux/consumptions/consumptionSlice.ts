import { createSlice } from "@reduxjs/toolkit";

interface consumptionStateInterface {
  isFetching: boolean;
  consumptions: [];
  error: string[];
}

const initialState: consumptionStateInterface = {
  isFetching: false,
  consumptions: [],
  error: [],
}
const consumptionSlice = createSlice({
  name: "consumptions",
  initialState,
  reducers: {
    statusConsumptionStart: (state) => {
      state.isFetching = true
      state.error = []
    },
    statusConsumptionSuccess: (state, action) => {
      state.isFetching = false
      state.consumptions = action.payload
      state.error = []
    },
    statusConsumptionFailure: (state, action) => {
      state.isFetching = false
      if(action.payload[0]?.startsWith("AFFICHER")) {
        state.consumptions = []
      }
      state.error = action.payload
    }
  }
}) 

export const { statusConsumptionStart, statusConsumptionSuccess, statusConsumptionFailure } = consumptionSlice.actions

export default consumptionSlice.reducer
