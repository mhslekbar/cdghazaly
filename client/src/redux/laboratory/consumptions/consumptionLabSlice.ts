import { createSlice } from "@reduxjs/toolkit";
import { DefaultLabConsumptionInterface, LabConsumptionInterface } from "../../../components/laboratory/consumptions/types";

interface initialStateInterface {
  isFetching: boolean,
  consumptionLab: LabConsumptionInterface[],
  error: string[],
} 

const initialState: initialStateInterface = {
  isFetching: false,
  consumptionLab: [DefaultLabConsumptionInterface],
  error: [""],
}

const consumptionLabSlice = createSlice({
  name: "consumptionLab",
  initialState,
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
      if(action.payload[0]?.startsWith("AFFICHER")) {
        state.consumptionLab = []
      }
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
