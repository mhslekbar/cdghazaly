import { createSlice } from "@reduxjs/toolkit";
import { AssuranceInterface } from "../../components/assurances/types";

interface props {
  isFetching: boolean,
  assurances: AssuranceInterface[],
  error: string[],
}

const initialState: props = {
  isFetching: false,
  assurances: [],
  error: [],
}

const assuranceSlice = createSlice({
  name: "assurance",
  initialState,
  reducers: {
    statusAssuranceStart: (state) => {
      state.isFetching = true
      state.error = []
    },
    statusAssuranceSuccess: (state, action) => {
      state.isFetching = false
      state.assurances = action.payload
      state.error = []
    },
    statusAssuranceFailure: (state, action) => {
      state.isFetching = false
      if(action.payload[0]?.startsWith("AFFICHER")) {
        state.assurances = []
      }
      state.error = action.payload
    }
  }
}) 

export const { statusAssuranceStart, statusAssuranceSuccess, statusAssuranceFailure } = assuranceSlice.actions

export default assuranceSlice.reducer
