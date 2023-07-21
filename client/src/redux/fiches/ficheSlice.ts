import { createSlice } from "@reduxjs/toolkit";
import { FicheInterface } from "../../components/ManagePatient/Fiches/types";

interface initialStateInterface {
  isFetching: boolean,
  fiches: FicheInterface[],
  error: string[],
}
const initialState:initialStateInterface = {
  isFetching: false,
  fiches: [],
  error: [],
}
const fichesSlice = createSlice({
  name: "fiches",
  initialState,
  reducers: {
    statusFicheStart: (state) => {
      state.isFetching = true
      state.error = []
    },
    statusFicheSuccess: (state, action) => {
      state.isFetching = false
      state.fiches = action.payload
      state.error = []
    },
    statusFicheFailure: (state, action) => {
      state.isFetching = false
      if(action.payload[0]?.startsWith("AFFICHER")) {
        state.fiches = []
      }
      state.error = action.payload
    }
  }
}) 

export const { statusFicheStart, statusFicheSuccess, statusFicheFailure } = fichesSlice.actions

export default fichesSlice.reducer
