import { createSlice } from "@reduxjs/toolkit";
import { laboratoryInterface } from "../../components/laboratory/types";

interface LaboratoryState {
  isFetching: boolean,
  laboratory: laboratoryInterface[],
  error: string[],
}

const DefaultLaboratoryState: LaboratoryState = {
  isFetching: false,
  laboratory: [],
  error: [],
}

const laboratorySlice = createSlice({
  name: "laboratory",
  initialState: DefaultLaboratoryState,
  reducers: {
    statusLabStart: (state) => {
      state.isFetching = true
      state.error = []
    },
    statusLabSuccess: (state, action) => {
      state.isFetching = false
      state.laboratory = action.payload
      state.error = []
    },
    statusLabFailure: (state, action) => {
      state.isFetching = false
      if(action.payload[0]?.startsWith("AFFICHER")) {
        state.laboratory = []
      }
      state.error = action.payload
    }
  }
}) 

export const { statusLabStart, statusLabSuccess, statusLabFailure } = laboratorySlice.actions

export default laboratorySlice.reducer
