import { createSlice } from "@reduxjs/toolkit";

interface initialStateInterface {
  isFetching: boolean,
  implants: [],
  error: string[],
}
const initialState:initialStateInterface = {
  isFetching: false,
  implants: [],
  error: [],
}
const implantSlice = createSlice({
  name: "implant",
  initialState,
  reducers: {
    statusImplantStart: (state) => {
      state.isFetching = true
      state.error = []
    },
    statusImplantSuccess: (state, action) => {
      state.isFetching = false
      state.implants = action.payload
      state.error = []
    },
    statusImplantFailure: (state, action) => {
      state.isFetching = false
      if(action.payload[0]?.startsWith("AFFICHER")) {
        state.implants = []
      }
      state.error = action.payload
    }
  }
}) 

export const { statusImplantStart, statusImplantSuccess, statusImplantFailure } = implantSlice.actions

export default implantSlice.reducer
