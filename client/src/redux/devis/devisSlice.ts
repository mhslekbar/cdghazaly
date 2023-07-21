import { createSlice } from "@reduxjs/toolkit";
import { DefaultDevisInterface, DevisInterface } from "../../components/ManagePatient/Devis/types";

interface initialStateInterface {
  isFetching: boolean,
  devis: DevisInterface[],
  error: string[],
}
const initialState:initialStateInterface = {
  isFetching: false,
  devis: [DefaultDevisInterface],
  error: [],
}
const devisSlice = createSlice({
  name: "devis",
  initialState,
  reducers: {
    statusDevisStart: (state) => {
      state.isFetching = true
      state.error = []
    },
    statusDevisSuccess: (state, action) => {
      state.isFetching = false
      state.devis = action.payload
      state.error = []
    },
    statusDevisFailure: (state, action) => {
      state.isFetching = false
      if(action.payload[0]?.startsWith("AFFICHER")) {
        state.devis = []
      }
      state.error = action.payload
    }
  }
}) 

export const { statusDevisStart, statusDevisSuccess, statusDevisFailure } = devisSlice.actions

export default devisSlice.reducer
